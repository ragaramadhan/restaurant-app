import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* <!-- Logo --> */}
        <a href="#" className="text-2xl font-bold tracking-wide">
          🍴 MyRestaurant
        </a>

        {/* <!-- Nav Links --> */}
        <nav className="hidden md:flex space-x-8 ">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            Menu
          </Link>
        </nav>
      </div>
    </div>
  );
}
