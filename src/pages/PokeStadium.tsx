import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { GetPokemonResponse } from '../graphql/types';
import { PokeLoader }from '../components/PokeLoader';
import { PokemonStats, PokemonMove, PokemonErrors, AnimationState, TurnState } from '../graphql/types';

const calculateDamage = (
  move: PokemonMove,
  attacker: PokemonStats,
  defender: PokemonStats,
  typeEffectiveness: number
) => {
  const level = attacker.level || 50;
  const variance = Math.random() * (1 - 0.85) + 0.85;
  const movePower = move.pokemon_v2_move.power || 50;

  const damage = Math.floor(
    ((((2 * level) / 5 + 2) * movePower * (attacker.attack / defender.defense)) / 50 + 2) *
    typeEffectiveness *
    variance
  );

  return Math.max(1, damage);
};

const PokeStadium = () => {
  const [pokemon1Name, setPokemon1Name] = useState<string>('');
  const [pokemon2Name, setPokemon2Name] = useState<string>('');
  const [showBattle, setShowBattle] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [isBattleComplete, setIsBattleComplete] = useState<boolean>(false);
  const [pokemon1HP, setPokemon1HP] = useState<number>(100);
  const [pokemon2HP, setPokemon2HP] = useState<number>(100);
  const [pokemon1Animating, setPokemon1Animating] = useState<AnimationState>('idle');
  const [pokemon2Animating, setPokemon2Animating] = useState<AnimationState>('idle');
  const [currentTurn, setCurrentTurn] = useState<TurnState>(null);
  const [pokemonErrors, setPokemonErrors] = useState<PokemonErrors>({
    pokemon1Error: false,
    pokemon2Error: false
  });
  const [battleMessage, setBattleMessage] = useState<string>('');

  const { data: pokemon1Data, loading: loading1, refetch: pokemon1Query } = useQuery<GetPokemonResponse>(GET_POKEMON, {
    variables: { name: pokemon1Name.toLowerCase() },
    skip: !showBattle,
    onCompleted: (data) => {
      if (!data.pokemon_v2_pokemon) {
        setPokemonErrors(prev => ({ ...prev, pokemon1Error: true }));
        setPokemon1Name('');
        setShowBattle(false);
      }
    }
  });

  const { data: pokemon2Data, loading: loading2, refetch: pokemon2Query } = useQuery<GetPokemonResponse>(GET_POKEMON, {
    variables: { name: pokemon2Name.toLowerCase() },
    skip: !showBattle,
    onCompleted: (data) => {
      if (!data.pokemon_v2_pokemon) {
        setPokemonErrors(prev => ({ ...prev, pokemon2Error: true }));
        setPokemon2Name('');
        setShowBattle(false);
      }
    }
  });

  useEffect(() => {
    if (!showBattle) {
      setPokemon1Animating('idle');
      setPokemon2Animating('idle');
    }
  }, [showBattle]);

  const handlePokemonSelect = (value: string, setPokemon: (name: string) => void) => {
    setPokemon(value);
    setInputError(false);
  };

  const handleSearch = () => {
    if (!pokemon1Name || !pokemon2Name) {
      setInputError(true);
      return;
    }
    setPokemonErrors({ pokemon1Error: false, pokemon2Error: false });
    setShowBattle(true);
    pokemon1Query();
    pokemon2Query();
    setCurrentTurn(Math.random() < 0.5 ? 1 : 2);
  };

  const handleResetBattle = () => {
    setIsBattleComplete(false);
    setPokemon1HP(100);
    setPokemon2HP(100);
    setCurrentTurn(Math.random() < 0.5 ? 1 : 2);
    setPokemon1Animating('idle');
    setPokemon2Animating('idle');
  };

  const handleRestart = () => {
    setPokemon1Name('');
    setPokemon2Name('');
    setShowBattle(false);
    setInputError(false);
    setIsBattleComplete(false);
    setPokemon1HP(100);
    setPokemon2HP(100);
    setCurrentTurn(null);
    setPokemonErrors({ pokemon1Error: false, pokemon2Error: false });
  };

  const handleAttack = (attacker: 1 | 2, moveIndex: number) => {
    if (!pokemon1Data?.pokemon_v2_pokemon[0] || !pokemon2Data?.pokemon_v2_pokemon[0]) return;

    const attackingPokemon = attacker === 1 ? pokemon1Data.pokemon_v2_pokemon[0] : pokemon2Data.pokemon_v2_pokemon[0];
    const defendingPokemon = attacker === 1 ? pokemon2Data.pokemon_v2_pokemon[0] : pokemon1Data.pokemon_v2_pokemon[0];

    const move: PokemonMove = {
      pokemon_v2_move: {
        name: attackingPokemon.pokemon_v2_pokemonmoves[moveIndex].pokemon_v2_move.name,
        power: attackingPokemon.pokemon_v2_pokemonmoves[moveIndex].pokemon_v2_move.power || 50,
        type: attackingPokemon.pokemon_v2_pokemonmoves[moveIndex].pokemon_v2_move.type,
        type_id: attackingPokemon.pokemon_v2_pokemonmoves[moveIndex].pokemon_v2_move.type_id,
      }
    };

    // Get Pokemon base stats
    const attackerStats: PokemonStats = {
      attack: attackingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 2)?.base_stat || 100,
      defense: attackingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 3)?.base_stat || 100,
      speed: attackingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 6)?.base_stat || 100,
    };

    const defenderStats: PokemonStats = {
      attack: defendingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 2)?.base_stat || 100,
      defense: defendingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 3)?.base_stat || 100,
      speed: defendingPokemon.pokemon_v2_pokemonstats.find(stat => stat.stat_id === 6)?.base_stat || 100,
    };

    // Calculate type effectiveness (simplified)
    const moveType = attackingPokemon.pokemon_v2_pokemonmoves[moveIndex].pokemon_v2_move.type_id;
    const defenderType = defendingPokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.type_id;
    const typeEffectiveness = getTypeEffectiveness(moveType, defenderType);

    const damage = calculateDamage(
      move,
      attackerStats,
      defenderStats,
      typeEffectiveness
    );

    // Animation sequence
    if (attacker === 1) {
      setPokemon1Animating('attacking');
      setTimeout(() => setPokemon2Animating('hit'), 400);
      setTimeout(() => setPokemon1Animating('idle'), 800);
      setTimeout(() => setPokemon2Animating('idle'), 900);

      setPokemon2HP(prev => {
        const newHP = Math.max(0, prev - damage);
        if (newHP === 0) {
          setTimeout(() => setPokemon2Animating('fainted'), 1000);
          setIsBattleComplete(true);
        }
        return newHP;
      });
    } else {
      setPokemon2Animating('attacking');
      setTimeout(() => setPokemon1Animating('hit'), 400);
      setTimeout(() => setPokemon2Animating('idle'), 800);
      setTimeout(() => setPokemon1Animating('idle'), 900);

      setPokemon1HP(prev => {
        const newHP = Math.max(0, prev - damage);
        if (newHP === 0) {
          setTimeout(() => setPokemon1Animating('fainted'), 1000);
          setIsBattleComplete(true);
      }
        return newHP;
      });
    }

    // Add battle message based on effectiveness
    setBattleMessage(getBattleMessage(typeEffectiveness, damage));

    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  // Helper functions
  const getTypeEffectiveness = (moveType: number, defenderType: number): number => {
    // Simplified type chart
    const typeChart: Record<number, Record<number, number>> = {
      // Fire
      10: { 12: 0.5, 11: 2 }, // Fire moves: weak vs Water, strong vs Grass
      // Water
      11: { 10: 2, 12: 0.5 }, // Water moves: strong vs Fire, weak vs Grass
      // Grass
      12: { 11: 2, 10: 0.5 }, // Grass moves: strong vs Water, weak vs Fire
      // Electric
      13: { 11: 2, 5: 0 }, // Electric moves: strong vs Water, no effect on Ground
      // Ground
      5: { 13: 2, 3: 0.5 }, // Ground moves: strong vs Electric, weak vs Flying
      // Flying
      3: { 12: 2, 5: 0.5 }, // Flying moves: strong vs Grass, weak vs Ground
    };

    return typeChart[moveType]?.[defenderType] || 1;
  };

  const getBattleMessage = (effectiveness: number, damage: number): string => {
    if (effectiveness > 1.5) return "It's super effective!";
    if (effectiveness < 0.8) return "It's not very effective...";
    if (damage < 10) return "A weak hit!";
    if (damage > 30) return "A critical hit!";
    return "Hit!";
  };

  return (
    <div className="min-h-screen bg-red-600 p-8">
      <div className="max-w-7xl mx-auto bg-red-500 rounded-lg shadow-lg p-6 border-8 border-red-700">
        {/* Top screen section with LED lights */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-400 border-4 border-white animate-pulse"/>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-red-800"/>
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600"/>
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-green-600"/>
          </div>
        </div>

        {/* Main battle screen */}
        <div className="bg-green-100 rounded-lg p-6 border-4 border-gray-800 shadow-inner">
          {/* Pokemon Selection */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <input
                type="text"
                placeholder="Enter Pokemon 1 name"
                className={`px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputError && !pokemon1Name ? 'border-red-500' : 'border-gray-300'
                }`}
                value={pokemon1Name}
                onChange={(e) => handlePokemonSelect(e.target.value, setPokemon1Name)}
                disabled={showBattle}
              />
              <input
                type="text"
                placeholder="Enter Pokemon 2 name"
                className={`px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputError && !pokemon2Name ? 'border-red-500' : 'border-gray-300'
                }`}
                value={pokemon2Name}
                onChange={(e) => handlePokemonSelect(e.target.value, setPokemon2Name)}
                disabled={showBattle}
              />
            </div>

            {inputError && (
              <p className="text-red-500 font-bold">Please enter both Pokémon names</p>
            )}

            {!showBattle ? (
              <button
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:-translate-y-1 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                disabled={!pokemon1Name || !pokemon2Name}
                onClick={handleSearch}
              >
                Battle!
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  disabled={!isBattleComplete}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg transition-all transform font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:bg-yellow-500 hover:bg-yellow-600 hover:-translate-y-1"
                  onClick={handleResetBattle}
                >
                  Reset Battle
                </button>
                <button
                  className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all transform hover:-translate-y-1 font-bold"
                  onClick={handleRestart}
                >
                  New Pokémon
                </button>
              </div>
            )}
          </div>

          {(pokemonErrors.pokemon1Error || pokemonErrors.pokemon2Error) && (
            <div className="text-red-500 font-bold text-center mb-4">
              {pokemonErrors.pokemon1Error && pokemonErrors.pokemon2Error ? (
                <p>Both Pokémon not found! You can help yourself with the pokedex.</p>
              ) : pokemonErrors.pokemon1Error ? (
                <p>Pokemon1 doesn't have a valid Pokémon name. You can help yourself with the pokedex.</p>
              ) : (
                <p>Pokemon2 doesn't have a valid Pokémon name. You can help yourself with the pokedex.</p>
              )}
            </div>
          )}

          {/* Battle Arena */}
          {showBattle && pokemon1Data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites && pokemon2Data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites && !pokemonErrors.pokemon1Error && !pokemonErrors.pokemon2Error && (
            <div className="bg-white rounded-lg p-6 shadow-lg border-4 border-gray-200">
              {/* Battle Scene */}
              <div className="relative h-[400px] mb-8 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                {/* Pokemon 2 HP Bar (Top Right) */}
                <div className="absolute top-2 right-4 w-56">
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <p className="font-bold mb-1 text-gray-800 capitalize">{pokemon2Data.pokemon_v2_pokemon[0].name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                      <div
                        className="bg-green-500 rounded-full h-full transition-all duration-300"
                        style={{ width: `${pokemon2HP}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-gray-600">{pokemon2HP}/100 HP</p>
                  </div>
                </div>

                {/* Pokemon 1 HP Bar (Bottom Left) - Adjusted width and positioning */}
                <div className="absolute bottom-2 left-4 w-56">
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <p className="font-bold mb-1 text-gray-800 capitalize">{pokemon1Data.pokemon_v2_pokemon[0].name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                      <div
                        className="bg-green-500 rounded-full h-full transition-all duration-300"
                        style={{ width: `${pokemon1HP}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-gray-600">{pokemon1HP}/100 HP</p>
                  </div>
                </div>

                {/* Pokemon Sprites */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Pokemon 1 (Bottom Left) */}
                  <div className="absolute bottom-20 left-24">
                    <img
                      src={pokemon1Data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites.back_default }
                      alt={pokemon1Data.pokemon_v2_pokemon[0].name}
                      className={`w-40 h-40 object-contain transition-all duration-300
                        ${pokemon1Animating === 'attacking' ? 'animate-slide-right' : ''}
                        ${pokemon1Animating === 'hit' ? 'animate-damage-glow' : ''}
                        ${pokemon1Animating === 'fainted' ? 'animate-faint' : ''}
                        ${!pokemon1Data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites.back_default ? 'scale-x-[-1]' : ''}
                      `}
                    />
                  </div>

                  {/* Pokemon 2 (Top Right) */}
                  <div className="absolute top-20 right-24">
                    <img
                      src={pokemon2Data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites.front_default}
                      alt={pokemon2Data.pokemon_v2_pokemon[0].name}
                      className={`w-40 h-40 object-contain transition-all duration-300
                        ${pokemon2Animating === 'attacking' ? 'animate-slide-left' : ''}
                        ${pokemon2Animating === 'hit' ? 'animate-damage-glow' : ''}
                        ${pokemon2Animating === 'fainted' ? 'animate-faint' : ''}
                      `}
                    />
                  </div>
                </div>
              </div>

              {/* Battle Controls */}
              <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-200">
                {!isBattleComplete ? (
                  <div className="relative">
                    {/* Message de tour */}
                    <div className="text-center mb-4">
                      <p className="text-xl font-bold text-gray-800">
                        {battleMessage || `What should ${currentTurn === 1 ? pokemon1Data.pokemon_v2_pokemon[0].name : pokemon2Data.pokemon_v2_pokemon[0].name} do?`}
                      </p>
                    </div>

                    {/* Grille d'attaques style Pokémon */}
                    <div className="grid grid-cols-2 gap-2 bg-white rounded-lg p-3 border-4 border-gray-300">
                      {(currentTurn === 1 ? pokemon1Data : pokemon2Data)
                        .pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves
                        .slice(0, 4)
                        .map(({ pokemon_v2_move }, i) => (
                          <button
                            key={i}
                            className={`
                              text-left px-4 py-3 rounded-lg
                              ${currentTurn === 1 ? 'hover:bg-red-100' : 'hover:bg-blue-100'}
                              transition-colors duration-200
                              border-2 border-gray-200
                              disabled:opacity-50 disabled:cursor-not-allowed
                              font-pokemon text-lg
                            `}
                            onClick={() => handleAttack(currentTurn as 1 | 2, i)}
                          >
                            ▶ {pokemon_v2_move.name.replace('-', ' ')}
                          </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 capitalize">
                      {pokemon1HP === 0
                        ? `${pokemon2Data.pokemon_v2_pokemon[0].name} wins!`
                        : `${pokemon1Data.pokemon_v2_pokemon[0].name} wins!`}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading States */}
          {(loading1 || loading2) && (
            <PokeLoader />
          )}
        </div>

        {/* Bottom control panel */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-700"></div>
          <div className="w-24 h-8 bg-gray-800 rounded-lg border-4 border-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default PokeStadium;
