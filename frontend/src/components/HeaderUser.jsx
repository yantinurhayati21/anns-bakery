import React from "react";
import { User, Search, Home } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderUser = () => {
  return (
    <>
      <header className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        {/* Left Section */}
        <div className="flex items-center space-x-4 pl-8">
          <img
            src="https://i.pinimg.com/474x/93/b3/e0/93b3e041f06c232f218e2c998549e0ae.jpg"
            alt="Logo"
            className="h-12 w-12 object-cover rounded-full shadow-md"
          />
          <div className="text-2xl font-bold tracking-wide font-cursive">
            Ann's Bakery
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-grow mx-12">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for a cake..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition duration-300"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 pr-8">
          <Link to="/">
            <Home className="h-6 w-6 text-white cursor-pointer hover:text-yellow-300 transition duration-300" />
          </Link>
          <Link to="/login/customer">
            <User className="h-6 w-6 text-white cursor-pointer hover:text-yellow-300 transition duration-300" />
          </Link>
        </div>
      </header>

      {/* Navigation Links */}
      <nav className="bg-white py-2 shadow-md">
        <div className="container mx-auto flex justify-around items-center">
          <Link
            to="/products"
            className="text-gray-700 hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            SHOP
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            SHOP BY OCCASION
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            CUSTOM CAKE
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            EVENTS
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            CORPORATE HAMPER
          </Link>
        </div>
      </nav>
    </>
  );
};

export default HeaderUser;
