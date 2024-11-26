import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { PokecardProps, GetPokemonResponse } from '../graphql/types';

function Pokecard({ pokemonName, onClose }: PokecardProps) {
  const { data, loading, error } = useQuery<GetPokemonResponse>(GET_POKEMON, {
    variables: { name: pokemonName.toLocaleLowerCase() },
  });
  
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) return null;
  if (error) return null;
  if (!data) return null;


  const { id, name, height, weight, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes, pokemon_v2_pokemonstats, pokemon_v2_pokemonabilities, pokemon_v2_pokemonmoves } = data?.pokemon_v2_pokemon[0] || {};

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl max-w-md w-full p-6 relative transform transition-all shadow-lg border-8 border-yellow-400 my-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center relative top-0 bg-gradient-to-br from-yellow-50 to-yellow-100 pt-2 pb-4 z-10">
          {/* Image container */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent rounded-lg" />
            <img
              src={pokemon_v2_pokemonsprites[0].sprites.front_default}
                alt={name}
              className="w-48 h-48 mx-auto relative z-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2"
            />
          </div>
          
          <h2 className="text-2xl font-bold capitalize mb-2 text-yellow-900">{name}</h2>
            <p className="text-yellow-700 mb-4 font-semibold">#{id}</p>
        </div>

        {/* Scrollable content */}
        <div className="relative">
          {/* Types */}
          <div className="flex justify-center gap-2 mb-4">
              {pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
              <span
                key={pokemon_v2_type.name}
                className="px-3 py-1 rounded-full text-white text-sm capitalize shadow-inner"
                style={{
                    backgroundColor: getTypeColor(pokemon_v2_type.name),
                  textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
                }}
              >
                {pokemon_v2_type.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 bg-yellow-50/50 rounded-lg p-3">
            <div>
              <p className="text-yellow-800">Height</p>
              <p className="font-bold text-yellow-900">{height / 10}m</p>
            </div>
            <div>
              <p className="text-yellow-800">Weight</p>
              <p className="font-bold text-yellow-900">{weight / 10}kg</p>
            </div>
          </div>

          {/* Base Stats */}
          <div className="space-y-2 bg-yellow-50/50 rounded-lg p-3">
            {pokemon_v2_pokemonstats.map(({ base_stat, pokemon_v2_stat }) => (
              <div key={pokemon_v2_stat.name} className="flex items-center">
                <span className="w-24 text-left text-yellow-800 capitalize font-medium">
                    {pokemon_v2_stat.name.replace('-', ' ')}:
                </span>
                <div className="flex-1 ml-4">
                  <div className="h-2 bg-yellow-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      style={{ width: `${(base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 w-8 text-right text-yellow-900 font-bold">{base_stat}</span>
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-yellow-900">Abilities</h3>
            <div className="flex flex-wrap justify-center gap-2">
                {pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
                <span
                  key={pokemon_v2_ability.name}
                  className="px-3 py-1 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full text-sm capitalize text-yellow-900 shadow-sm"
                >
                  {pokemon_v2_ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Moves */}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-yellow-900">Moves </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {pokemon_v2_pokemonmoves.slice(0, 4).map(({ pokemon_v2_move }, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full text-sm capitalize text-yellow-900 shadow-sm"
                >
                  {pokemon_v2_move.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get color based on pokemon type
function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#777777';
}

export default Pokecard;
