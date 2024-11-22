export const PokeLoader = () => {
  return (
    <div className="min-h-screen bg-red-600 p-8">
      <div className="max-w-7xl mx-auto bg-red-500 rounded-lg shadow-lg p-6 border-8 border-red-700">
        <div className="flex flex-col items-center justify-center h-96">
      <div className="w-24 h-24 relative animate-bounce">
        <div className="absolute w-full h-full rounded-full bg-white border-8 border-gray-800">
          <div className="absolute top-1/2 w-full h-[8px] bg-gray-800"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-gray-800"></div>
            </div>
          </div>
          <p className="mt-4 text-white text-xl font-bold">Loading Pokémon...</p>
        </div>
      </div>
    </div>
  );
};
