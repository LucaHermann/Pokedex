import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pokedex from './pages/Pokedex';

// Configuration Apollo Client pour GraphQL
const apolloClient = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql', // API GraphQL pour les Pokémon
  cache: new InMemoryCache(),
});

// Configuration React Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Pokedex />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
