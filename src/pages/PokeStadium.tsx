import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { Pokemon } from '../graphql/types';

const PokeStadium = () => {
  const [pokemon1Name, setPokemon1Name] = useState<string>('');
  const [pokemon2Name, setPokemon2Name] = useState<string>('');
  const [showBattle, setShowBattle] = useState<boolean>(false);

  const { data: pokemon1Data, loading: loading1 } = useQuery<Pokemon>(GET_POKEMON, {
    variables: { name: pokemon1Name.toLowerCase() },
    skip: !pokemon1Name,
  });

  const { data: pokemon2Data, loading: loading2 } = useQuery<Pokemon>(GET_POKEMON, {
    variables: { name: pokemon2Name.toLowerCase() },
    skip: !pokemon2Name,
  });

  const handlePokemonSelect = (value: string, setPokemon: (name: string) => void) => {
    setPokemon(value);
    if (pokemon1Name && pokemon2Name) {
      setShowBattle(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Pokémon Stadium
      </h1>

      {/* Pokemon Selection */}
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Pokemon 1 name"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handlePokemonSelect(e.target.value, setPokemon1Name)}
        />
        <input
          type="text"
          placeholder="Enter Pokemon 2 name"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handlePokemonSelect(e.target.value, setPokemon2Name)}
        />
      </div>

      {/* Battle Arena */}
      {showBattle && pokemon1Data && pokemon2Data && !loading1 && !loading2 && (
        <div className="max-w-4xl mx-auto">
          {/* HP Bars */}
          <div className="flex justify-between mb-8">
            <div className="w-1/3">
              <p className="font-bold mb-2">{pokemon1Data?.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 rounded-full h-4"
                  style={{
                    width: `${Math.min(
                      (pokemon1Data?.stats?.find(
                        (stat) => stat.stat.name === 'hp'
                      )?.base_stat || 0),
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-1/3">
              <p className="font-bold mb-2">{pokemon2Data?.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 rounded-full h-4"
                  style={{
                    width: `${Math.min(
                      (pokemon2Data?.stats?.find(
                        (stat) => stat.stat.name === 'hp'
                      )?.base_stat || 0),
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sprites */}
          <div className="flex justify-between items-center mb-8">
            <img
              src={pokemon1Data.sprites.back_default || ''}
              alt={pokemon1Data.name}
              className="w-48 h-48 object-contain"
            />
            <img
              src={pokemon2Data.sprites.front_default || ''}
              alt={pokemon2Data.name}
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Moves */}
          <div className="flex justify-between">
            <div className="w-1/3">
              <div className="grid grid-cols-2 gap-2">
                {pokemon1Data.moves.slice(0, 4).map((move, index) => (
                  <button
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {move.move.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-1/3">
              <div className="grid grid-cols-2 gap-2">
                {pokemon2Data.moves.slice(0, 4).map((move, index) => (
                  <button
                    key={index}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {move.move.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading States */}
      {(loading1 || loading2) && (
        <div className="text-center text-gray-600">Loading Pokémon data...</div>
      )}
    </div>
  );
};

export default PokeStadium;
