// Base interfaces for Pokemon data structure
interface PokemonSprite {
  front_default: string;
  back_default: string;
}

// Common nested structures
interface NameOnly {
  name: string;
}

// Pokemon component interfaces
interface PokemonType {
  type: NameOnly;
}

interface PokemonStat {
  base_stat: number;
  stat: NameOnly;
}

interface PokemonAbility {
  ability: NameOnly;
}

interface PokemonMove {
  move: NameOnly & {
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

// Basic Pokemon info used in lists
export interface PokemonBasicInfo {
  id: number;
  name: string;
  image: string;
}

// Response and Query interfaces
export interface PaginationVars {
  limit: number;
  offset: number;
}

export interface PokemonVars {
  name: string;
}

export interface PokemonListResponse {
  pokemons: {
    results: PokemonBasicInfo[];
  };
}

// Consolidated Pokemon response interfaces
export type SinglePokemonResponse = GetPokemonResponse;
export interface GetPokemonResponse {
  pokemon: Pokemon;
}

// Props interfaces
export interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}