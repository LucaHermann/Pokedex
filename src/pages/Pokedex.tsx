import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_POKEMONS } from '../graphql/queries';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonData {
  pokemons: {
    results: Pokemon[];
  };
}

function Pokedex() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  
  // Define generation ranges
  const generationRanges = {
    1: { limit: 151, offset: 0 },    // Gen 1: 1-151
    2: { limit: 100, offset: 151 },  // Gen 2: 152-251
    3: { limit: 135, offset: 251 },  // Gen 3: 252-386
    4: { limit: 107, offset: 386 },  // Gen 4: 387-493
    5: { limit: 156, offset: 493 },  // Gen 5: 494-649
    6: { limit: 72, offset: 649 },   // Gen 6: 650-721
    7: { limit: 88, offset: 721 },   // Gen 7: 722-809
    8: { limit: 96, offset: 809 },   // Gen 8: 810-905
    9: { limit: 103, offset: 905 },  // Gen 9: 906-1008
  };

  const { data, loading, error } = useQuery<PokemonData>(GET_POKEMONS, {
    variables: generationRanges[selectedGeneration as keyof typeof generationRanges]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="pokedex">
      <div className="generation-selector">
        <label htmlFor="generation">Select Generation: </label>
        <select
          id="generation"
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(Number(e.target.value))}
        >
          {generations.map((gen) => (
            <option key={gen} value={gen}>
              Generation {gen}
            </option>
          ))}
        </select>
      </div>

      <div className="pokemon-grid">
        {data?.pokemons.results.map((pokemon: Pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
