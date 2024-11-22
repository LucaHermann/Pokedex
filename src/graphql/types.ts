// Base interfaces for Pokemon data structure
interface PokemonSprite {
  front_default: string;
  back_default: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
    accuracy?: number;
    pp?: number;
    power?: number;
  };
}

// Main Pokemon interface
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

// Response interfaces
export interface PokemonListResponse {
  pokemons: {
    results: {
      id: number;
      name: string;
      image: string;
    }[];
  };
}

export interface SinglePokemonResponse {
  pokemon: Pokemon;
}

// Query variables interfaces
export interface PaginationVars {
  limit: number;
  offset: number;
}

export interface PokemonVars {
  name: string;
}

// Props interfaces
export interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}

export interface GetPokemonResponse {
  pokemon: Pokemon;
}