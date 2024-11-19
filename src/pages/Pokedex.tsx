import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';

function Pokedex() {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name: 'bulbasaur' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data.pokemon;

  return (
    <div className="pokedex">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Types: {pokemon.types.map((t: { type: { name: string } }) => t.type.name).join(', ')}</p>
    </div>
  );
}

export default Pokedex;
