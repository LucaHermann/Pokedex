import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center space-x-4">
        <Link 
          to="/pokedex" 
          className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
        >
          Pokédex
        </Link>
        <Link 
          to="/stadium" 
          className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
        >
          Poké Stadium
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
