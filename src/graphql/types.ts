// Base interfaces for Pokemon data structure
interface PokemonSprite {
  sprites: {
    front_default: string;
    back_default: string;
  };
}

// Common nested structures
interface NameOnly {
  name: string;
}

// Pokemon component interfaces
interface PokemonType {
  pokemon_v2_type: NameOnly;
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: NameOnly;
}

interface PokemonAbility {
  pokemon_v2_ability: NameOnly;
}

interface PokemonMove {
  pokemon_v2_move: NameOnly & {
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
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonmoves: PokemonMove[];
}

// Basic Pokemon info used in lists
export interface PokemonBasicInfo {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: PokemonSprite[];
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
  pokemon_v2_pokemon: PokemonBasicInfo[];
}

// Consolidated Pokemon response interfaces
export type SinglePokemonResponse = GetPokemonResponse;
export interface GetPokemonResponse {
  pokemon_v2_pokemon: Pokemon[];
}

// Props interfaces
export interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}