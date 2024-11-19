import create from 'zustand';

const usePokedexStore = create((set) => ({
  selectedPokemon: null,
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));

export default usePokedexStore;
