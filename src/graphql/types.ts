export interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemons: [{
    pokemon_v2_pokemonsprites: [{
      sprites: string;
    }];
    pokemon_v2_pokemontypes: [{
      pokemon_v2_type: {
        name: string;
      };
    }];
  }];
}

export interface Pokemons {
  id: number;
  name: string;
  image: string;
}

export interface PokemonsData {
  pokemons: {
    results: Pokemons[];
  };
}

export interface PokemonVariables {
  limit: number;
  offset: number;
}

export interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}

export interface PokemonDetails {
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