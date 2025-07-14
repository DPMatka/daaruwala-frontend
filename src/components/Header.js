import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          DaaruWala
        </Link>
        <nav className="flex gap-6">
          <Link to="/category/whiskey" className="hover:text-purple-400">Whiskey</Link>
          <Link to="/category/rum" className="hover:text-purple-400">Rum</Link>
          <Link to="/category/beer" className="hover:text-purple-400">Beer</Link>
          <Link to="/category/cigarette" className="hover:text-purple-400">Cigarette</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white">Login</Link>
          <Link to="/register" className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white">Register</Link>
          <Link to="/cart" className="relative ml-4">
            <span role="img" aria-label="cart" className="text-2xl">🛒</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;