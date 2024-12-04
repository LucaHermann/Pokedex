import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
query GetPokemons($limit: Int!, $offset: Int!) {
  pokemon_v2_pokemon(limit: $limit, offset: $offset) {
    id
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
}`;

export const GET_POKEMON = gql`
query GetPokemon($name: String!) {
  pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
    id
    name
    height
    weight
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonmoves(limit: 4) {
      pokemon_v2_move {
        name
        accuracy
        pp
        power
        type_id
        pokemon_v2_moveeffect {
          pokemon_v2_moveeffecteffecttexts(where: {language_id: {_eq: 9}}) {
            effect
            short_effect
          }
        }
      }
    }
  }
}`;