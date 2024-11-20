import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Pokedex from './pages/Pokedex';
import PokeStadium from './pages/PokeStadium';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <Router>
      <div>
        <TopBar />
        <Routes>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/stadium" element={<PokeStadium />} />
          <Route path="/" element={<Pokedex />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
    </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
