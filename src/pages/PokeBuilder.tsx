const PokeBuilder = () => {
  return (
      <div className="min-h-screen bg-red-600 p-8">
      <div className="max-w-7xl mx-auto bg-red-500 rounded-lg shadow-lg p-6 border-8 border-red-700">
        {/* Top screen section */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-400 border-4 border-white animate-pulse"/>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-red-800"/>
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600"/>
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-green-600"/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-96">
          <h1>PokéBuilder</h1>
        </div>
        {/* Bottom control panel */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-700"/>
          <div className="w-24 h-8 bg-gray-800 rounded-lg border-4 border-gray-700"/>
        </div>
      </div>
    </div>
  );
};

export default PokeBuilder;