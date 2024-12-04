// Helper function to get color based on pokemon type or type_id
export function getTypeColor(type: string | number): string {
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