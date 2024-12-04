import { PokemonMove, PokemonStats } from "../graphql/types";

/**
 * Returns a color code based on Pokemon type or type_id
 * Maps both string type names and numeric type_ids to their corresponding colors
 * Falls back to gray (#777777) if type is not recognized
 * @param type - Pokemon type (string) or type_id (number)
 * @returns Hex color code for the given type
 */
export const getTypeColor = (type: string | number): string => {
  const typeColors: { [key: string | number]: string } = {
    // By name
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
    // By type_id
    1: '#A8A878',  // normal
    2: '#C03028',  // fighting
    3: '#A890F0',  // flying
    4: '#A040A0',  // poison
    5: '#E0C068',  // ground
    6: '#B8A038',  // rock
    7: '#A8B820',  // bug
    8: '#705898',  // ghost
    9: '#B8B8D0',  // steel
    10: '#F08030', // fire
    11: '#6890F0', // water
    12: '#78C850', // grass
    13: '#F8D030', // electric
    14: '#F85888', // psychic
    15: '#98D8D8', // ice
    16: '#7038F8', // dragon
    17: '#705848', // dark
    18: '#EE99AC', // fairy
  };

  return typeColors[type] || '#777777';
}

/**
 * Calculates battle damage using Pokemon damage formula
 * @param move - The move being used in the attack
 * @param attacker - Stats of the attacking Pokemon
 * @param defender - Stats of the defending Pokemon
 * @param typeEffectiveness - Type effectiveness multiplier (0.5, 1, 2 etc)
 * @returns Calculated damage (minimum 1)
 */
export const calculateDamage = (
  move: PokemonMove,
  attacker: PokemonStats,
  defender: PokemonStats,
  typeEffectiveness: number
) => {
  // Default level 50 if not specified
  const level = attacker.level || 50;
  // Random variance between 0.85 and 1.0
  const variance = Math.random() * (1 - 0.85) + 0.85;
  // Default power 50 if move has no power
  const movePower = move.pokemon_v2_move.power || 50;

  // Pokemon damage formula:
  // ((2 * Level / 5 + 2) * Power * (Attack / Defense)) / 50 + 2
  // Multiplied by type effectiveness and random variance
  const damage = Math.floor(
    ((((2 * level) / 5 + 2) * movePower * (attacker.attack / defender.defense)) / 50 + 2) *
    typeEffectiveness *
    variance
  );

  // Ensure minimum damage of 1
  return Math.max(1, damage);
};


/**
 * Calculates type effectiveness multiplier between move type and defender type
 * Based on simplified Pokemon type chart focusing on key relationships:
 * - Fire: weak vs Water (0.5x), strong vs Grass (2x)
 * - Water: strong vs Fire (2x), weak vs Grass (0.5x)
 * - Grass: strong vs Water (2x), weak vs Fire (0.5x)
 * - Electric: strong vs Water (2x), no effect on Ground (0x)
 * - Ground: strong vs Electric (2x), weak vs Flying (0.5x)
 * - Flying: strong vs Grass (2x), weak vs Ground (0.5x)
 *
 * @param moveType - Type ID of the attacking move
 * @param defenderType - Type ID of the defending Pokemon
 * @returns Effectiveness multiplier (0, 0.5, 1, or 2)
 */
export const getTypeEffectiveness = (moveType: number, defenderType: number): number => {
  const typeChart: Record<number, Record<number, number>> = {
    10: { 12: 0.5, 11: 2 },
    11: { 10: 2, 12: 0.5 },
    12: { 11: 2, 10: 0.5 },
    13: { 11: 2, 5: 0 },
    5: { 13: 2, 3: 0.5 },
    3: { 12: 2, 5: 0.5 },
  };

  return typeChart[moveType]?.[defenderType] || 1;
};

/**
 * Generates a battle message based on move effectiveness and damage
 * @param effectiveness - Type effectiveness multiplier (0-2)
 * @param damage - Amount of damage dealt
 * @returns Message describing the attack effectiveness
 */
export const getBattleMessage = (effectiveness: number, damage: number): string => {
  if (effectiveness > 1.5) return "It's super effective!";
  if (effectiveness < 0.8) return "It's not very effective...";
  if (damage < 10) return "A weak hit!";
  if (damage > 30) return "A critical hit!";
  return "Hit!";
};