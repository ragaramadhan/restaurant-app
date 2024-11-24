import Navbar from "../src/components/Navbar";
import Card from "../src/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(""); // ASC or DESC

  // Helper function for pagination
  const getPagination = () => {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
  };

  const fetchCuisine = async () => {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/cuisines?limit=12&search=${search}&filter=${filter}&page=${currentPage}&sort=${sort}`);
      setCuisines(data.result.data);
      setTotalPage(data.result.totalPage);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/category`);
      setCategory(data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchCategory();
  }, []);

  // Fetch cuisines when dependencies change
  useEffect(() => {
    fetchCuisine();
    if (search) {
      setFilter("");
    }
  }, [currentPage, search, filter, sort]);

  return (
    <>
      <Navbar />

      {/* Filter by Category */}
      <div className="container mx-auto px-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category:</h2>
        <div className="flex flex-wrap gap-4">
          {category.map((el) => (
            <button
              key={el.id}
              className={`px-4 py-2 rounded-lg font-medium transition-all shadow-md border ${filter === el.id ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"}`}
              type="button"
              onClick={() => {
                setFilter(el.id);
                setCurrentPage(1); // Reset to the first page when filter changes
              }}
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="container mx-auto px-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sort by:</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow-md ${sort === "name" ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            onClick={() => {
              setSort("name");
              setCurrentPage(1); // Reset to the first page when sort changes
            }}
          >
            Ascending
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow-md ${sort === "-name" ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            onClick={() => {
              setSort("-name");
              setCurrentPage(1); // Reset to the first page when sort changes
            }}
          >
            Descending
          </button>
        </div>
      </div>

      {/* Search Input */}
      <form className="max-w-md mx-auto mt-5">
        <div className="relative">
          <input
            type="search"
            className="block w-full p-4 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Find food here ..."
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to the first page when search changes
            }}
          />
        </div>
      </form>

      {/* Cuisine Cards */}
      <Card cuisines={cuisines} />

      {/* Pagination */}
      <nav className="flex items-center justify-center gap-x-2 mt-8">
        <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium shadow-md disabled:bg-gray-100 disabled:text-gray-400" onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        {getPagination().map((page) => (
          <button key={page} type="button" className={`px-4 py-2 rounded-lg font-medium shadow-md ${page === currentPage ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
        <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium shadow-md disabled:bg-gray-100 disabled:text-gray-400" onClick={handleNext} disabled={currentPage === totalPage}>
          Next
        </button>
      </nav>
    </>
  );
}
