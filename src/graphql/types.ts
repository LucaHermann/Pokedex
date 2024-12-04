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
  pokemon_v2_type: NameOnly & {
    type_id: number;
  };
}

interface PokemonStat {
  stat_id: number;
  base_stat: number;
  pokemon_v2_stat: NameOnly;
}

interface PokemonAbility {
  pokemon_v2_ability: NameOnly;
}

export interface PokemonMove {
  power?: number;
  type?: string;
  pokemon_v2_move: NameOnly & {
    accuracy?: number;
    pp?: number;
    power?: number;
    type_id: number;
    type: string;
  };
}

// Game state types
export type AnimationState = 'idle' | 'attacking' | 'hit' | 'fainted';
export type TurnState = 1 | 2 | null;
export type TypeChart = Record<number, Record<number, number>>;

// Battle-specific types
export type PokemonStats = {
  attack: number;
  defense: number;
  speed: number;
  level?: number;
};

export type PokemonErrors = {
  pokemon1Error: boolean;
  pokemon2Error: boolean;
};

// Main Pokemon interfaces
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
  pokemon_v2_pokemon: Array<{
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemonsprites: PokemonSprite[];
    pokemon_v2_pokemontypes: PokemonType[];
    pokemon_v2_pokemonstats: PokemonStat[];
    pokemon_v2_pokemonabilities: PokemonAbility[];
    pokemon_v2_pokemonmoves: PokemonMove[];
  }>;
}

// Props interfaces
export interface PokecardProps {
  pokemonName: string;
  onClose: () => void;
}
