import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate(`/login`);
  }
  return (
    <nav className="bg-blue-400 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white font-bold text-xl">MyRestaurant</div>

        {/* Navigation Buttons */}
        <div className="space-x-4">
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            {" "}
            <span>Cuisines</span>
          </Link>

          <Link to="/add" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            <span>Add Cuisine</span>
          </Link>
          <Link to="/category" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            <span>Category</span>
          </Link>
          <Link to="/add/user" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            <span>Add User</span>
          </Link>
          <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition duration-300">
            <a href="" onClick={handleLogout}>
              Logout
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
}
