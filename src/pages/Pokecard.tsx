import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';

interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}

interface PokemonDetails {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string } }[];
    moves: { move: { name: string } }[];
    sprites: { front_default: string };
  };
}

function Pokecard({ pokemonName, onClose }: PokecardProps) {
  const { data, loading, error } = useQuery<PokemonDetails>(GET_POKEMON, {
    variables: { name: pokemonName },
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

  const { pokemon } = data;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl max-w-md w-full p-6 relative transform transition-all shadow-lg border-8 border-yellow-400 my-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center relative top-0 bg-gradient-to-br from-yellow-50 to-yellow-100 pt-2 pb-4 z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-yellow-800 hover:text-yellow-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image container */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent rounded-lg" />
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 mx-auto relative z-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2"
            />
          </div>
          
          <h2 className="text-2xl font-bold capitalize mb-2 text-yellow-900">{pokemon.name}</h2>
          <p className="text-yellow-700 mb-4 font-semibold">#{pokemon.id}</p>
        </div>

        {/* Scrollable content */}
        <div className="relative">
          {/* Types */}
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="px-3 py-1 rounded-full text-white text-sm capitalize shadow-inner"
                style={{
                  backgroundColor: getTypeColor(type.name),
                  textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
                }}
              >
                {type.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 bg-yellow-50/50 rounded-lg p-3">
            <div>
              <p className="text-yellow-800">Height</p>
              <p className="font-bold text-yellow-900">{pokemon.height / 10}m</p>
            </div>
            <div>
              <p className="text-yellow-800">Weight</p>
              <p className="font-bold text-yellow-900">{pokemon.weight / 10}kg</p>
            </div>
          </div>

          {/* Base Stats */}
          <div className="space-y-2 bg-yellow-50/50 rounded-lg p-3">
            {pokemon.stats.map(({ base_stat, stat }) => (
              <div key={stat.name} className="flex items-center">
                <span className="w-24 text-left text-yellow-800 capitalize font-medium">
                  {stat.name.replace('-', ' ')}:
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
              {pokemon.abilities.map(({ ability }) => (
                <span
                  key={ability.name}
                  className="px-3 py-1 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full text-sm capitalize text-yellow-900 shadow-sm"
                >
                  {ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Moves */}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-yellow-900">Abilities</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.moves.map(({ move }) => (
                <span
                  key={move.name}
                  className="px-3 py-1 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full text-sm capitalize text-yellow-900 shadow-sm"
                >
                  {move.name.replace('-', ' ')}
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
