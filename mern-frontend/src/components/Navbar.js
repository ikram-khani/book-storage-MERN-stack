// components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          My Book App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-white hover:underline font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:underline font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Register
            </Link>
          </li>
          <li>
            <Link to="/books" className="text-white hover:underline font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Book List
            </Link>
          </li>
          <li>
            <Link to="/add-book" className="text-white hover:underline font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Add Book
            </Link>
          </li>
          <li>
            <Link to="/search" className="text-white hover:underline font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
