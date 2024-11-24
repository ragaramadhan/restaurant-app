import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
export default function Cuisines() {
  const [cuisines, setCuisines] = useState([]);

  async function fetchCuisine() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/cuisines`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      //   console.log(data.result.data);
      //   console.log(data.cuisine);

      setCuisines(data.cuisine);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`https://server.ragaram.site/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(id);

      fetchCuisine();

      // console.log(data.message);

      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "#000000",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpload(file, id) {
    try {
      // console.log(file, id);

      const formData = new FormData();
      formData.append("image", file);
      // console.log(formData);

      const { data } = await axios.patch(`https://server.ragaram.site/cuisines/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchCuisine();
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCuisine();
  }, []);
  return (
    <>
      <div className="p-4">
        <table className="table-auto w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">imgUrl</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          {cuisines.map((el) => {
            return (
              <tbody key={el.id}>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{el.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{el.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{el.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={el.imgUrl} alt="" className="h-36 w-full" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-end mb-3">
                      <input type="file" onChange={(e) => handleUpload(e.target.files[0], el.id)} />
                    </div>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(el.id)}>
                      Delete
                    </button>
                    <Link to={`/edit/${el.id}`} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}
