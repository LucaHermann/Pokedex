import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_POKEMONS } from '../graphql/queries';
import Pokecard from '../components/Pokecard';
import { PokemonListResponse, PaginationVars } from '../graphql/types';

function Pokedex() {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

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

  const { data, loading, error } = useQuery<PokemonListResponse, PaginationVars>(GET_POKEMONS, {
    variables: generationRanges[selectedGeneration as keyof typeof generationRanges]
  });

  if (loading) return (
    <div className="min-h-screen bg-red-600 p-8">
      <div className="max-w-7xl mx-auto bg-red-500 rounded-lg shadow-lg p-6 border-8 border-red-700">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-24 h-24 relative animate-bounce">
            <div className="absolute w-full h-full rounded-full bg-white border-8 border-gray-800">
              <div className="absolute top-1/2 w-full h-[8px] bg-gray-800" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-gray-800" />
            </div>
          </div>
          <p className="mt-4 text-white text-xl font-bold">Loading Pokémon...</p>
        </div>
      </div>
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;

  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="min-h-screen bg-red-600 p-8">
      <div className="max-w-7xl mx-auto bg-red-500 rounded-lg shadow-lg p-6 border-8 border-red-700">
        {/* Top screen section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-400 border-4 border-white animate-pulse"/>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-red-800"/>
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600"/>
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-green-600"/>
          </div>
          <div className="generation-selector bg-gray-200 rounded-lg p-2">
            <label htmlFor="generation" className="font-bold text-gray-700 mr-2">Select Generation: </label>
            <select
              id="generation"
              value={selectedGeneration}
              onChange={(e) => setSelectedGeneration(Number(e.target.value))}
              className="bg-white border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            >
              {generations.map((gen) => (
                <option key={gen} value={gen}>
                  Generation {gen}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main display screen */}
        <div className="bg-green-100 rounded-lg p-6 border-4 border-gray-800 shadow-inner">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-bounce">
                <div className="w-16 h-16 rounded-full border-8 border-red-500 border-t-transparent animate-spin"/>
              </div>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center font-bold">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.pokemon_v2_pokemon.map((pokemon) => {
                return (
                  <div 
                    key={pokemon.id} 
                    className="pokemon-card bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedPokemon(pokemon.name)}
                  >
                    <div className="relative pb-[100%]">
                      <img 
                        src={pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default} 
                        alt={pokemon.name}
                        className="absolute inset-0 w-full h-full object-contain p-2"
                      />
                    </div>
                    <h2 className="text-center mt-2 font-bold text-gray-800 capitalize">
                      {pokemon.name}
                    </h2>
                    <div className="text-center text-sm text-gray-600">#{pokemon.id}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom control panel */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-700"/>
          <div className="w-24 h-8 bg-gray-800 rounded-lg border-4 border-gray-700"/>
        </div>
      </div>

      {selectedPokemon && (
        <Pokecard
          pokemonName={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default Pokedex;
