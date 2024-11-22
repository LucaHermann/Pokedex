import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
query GetPokemons($limit: Int!, $offset: Int!) {
  pokemons(limit: $limit, offset: $offset) {
    results {
      id
      name
      image
    }
  }
}

`;

export const GET_POKEMON = gql`
query GetPokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    height
    weight
    types {
      type {
        name
      }
    }
    stats {
      base_stat
      stat {
        name
      }
    }
    abilities {
      ability {
        name
      }
    }
    moves {
      move {
        name
      }
    }
    sprites {
      front_default
      back_default
    }
  }
}

`;

