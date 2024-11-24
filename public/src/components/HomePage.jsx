import Navbar from "./Navbar";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import cuisineJson from "../../cuisines.json";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState("");

  async function fetchCuisine() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/cuisines?limit=12&search=${search}&filter=${filter}&page=${page}`);

      //   console.log(data.result.data);

      //   console.log(data.data.query);
      setCuisines(data.result.data);
      setData(data.result);
      // console.log(data);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/category`);
      //   console.log(data.category);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, [search, filter, page]);

  useEffect(() => {
    fetchCategory();
  }, []);

  //   console.log(category);

  return (
    <>
      <Navbar></Navbar>

      <div className="flex justify-end">
        {category.map((el) => {
          return (
            <div className="">
              <button className=" bg-slate-800 py-2 px-4 border border-white text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => setFilter(el.id)}>
                {/* {el.name} */} {el.name}
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <button className="" type="button" onClick={() => setPage(+data.currentPage + 1)}>
          NEXT
        </button>
      </div>
      <div>
        <button className="" type="button" onClick={() => setPage(+data.currentPage - 1)}>
          BEFORE
        </button>
      </div>

      <form className="max-w-md mx-auto mt-5 border-2 border-black">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find food here ..." required="" onChange={(e) => setSearch(e.target.value)} />
        </div>
      </form>
      <Card cuisines={cuisines} />
    </>
  );
}
