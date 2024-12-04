import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { PokecardProps, GetPokemonResponse } from '../graphql/types';
import { getTypeColor } from '../utils/utils';
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


  const {
    id, name, height,
    weight, pokemon_v2_pokemonsprites,
    pokemon_v2_pokemontypes, pokemon_v2_pokemonstats,
    pokemon_v2_pokemonmoves
  } = data?.pokemon_v2_pokemon[0] || {};

  // Filter unique moves
  const uniqueMoves = pokemon_v2_pokemonmoves.reduce((acc, curr) => {
    const exists = acc.find(move => move.pokemon_v2_move.name === curr.pokemon_v2_move.name);
    if (!exists) acc.push(curr);
    return acc;
  }, [] as typeof pokemon_v2_pokemonmoves);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-xl w-[350px] p-6 relative
        shadow-xl border-8 border-yellow-500 transform transition-all hover:scale-102">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold capitalize">{name}</h2>
          <span className="font-bold">
            HP {pokemon_v2_pokemonstats.find(stat => stat.pokemon_v2_stat.name === 'hp')?.base_stat}
          </span>
        </div>

        {/* Pokemon Image */}
        <div className="bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 rounded-lg p-2 mb-4">
          <img
            src={pokemon_v2_pokemonsprites[0].sprites.front_default}
            alt={name}
            className="w-full h-48 object-contain"
          />
        </div>

        {/* Pokemon Info */}
        <div className="space-y-4">
          {/* Types */}
          <div className="flex gap-2">
            {pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
              <span
                key={pokemon_v2_type.name}
                className="px-3 py-1 rounded-full text-white text-sm capitalize"
                style={{ backgroundColor: getTypeColor(pokemon_v2_type.name) }}
              >
                {pokemon_v2_type.name}
              </span>
            ))}
          </div>

          {/* Moves */}
          <div className="space-y-2">
            {uniqueMoves.map(({ pokemon_v2_move }) => (
              <div
                key={pokemon_v2_move.name}
                className="bg-yellow-100 rounded p-2"
              >
                <div className="flex justify-between items-center">
                  <span className="capitalize font-medium">
                    {pokemon_v2_move.name.replace('-', ' ')}
                  </span>
                  <span className="font-bold">
                    {pokemon_v2_move.power || '—'}
                  </span>
                </div>
                <p className="text-xs italic">
                  {pokemon_v2_move.pokemon_v2_moveeffect?.pokemon_v2_moveeffecteffecttexts[0]?.short_effect ||
                  'No effect description available'}
                </p>
              </div>
            ))}
          </div>

          {/* Pokemon Details */}
          <div className="text-sm border-t border-yellow-600 pt-2">
            <p>Height: {height / 10}m</p>
            <p>Weight: {weight / 10}kg</p>
            <p className="italic mt-1">
              #{id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
