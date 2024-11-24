import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      //   console.log(data.category);
      setCategories(data.category);
      //   console.log(categories);
    } catch (error) {
      console.log(error);
      //   console.log(`masuk sini hehehe`);
    }
  }

  useEffect(() => {
    fetchCategories();

    // console.log(categories);
  }, []);

  return (
    <>
      <div className="mt-5 flex justify-center">
        <Link to={`/add/category`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Category
        </Link>
      </div>
      <br />
      <div className="p-4">
        <table className="table-auto w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Name Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((el) => (
              <tr key={el.id}>
                <td className="border border-gray-300 px-4 py-2">{el.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
