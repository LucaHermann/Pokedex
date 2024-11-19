import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
    }
  }
`;
