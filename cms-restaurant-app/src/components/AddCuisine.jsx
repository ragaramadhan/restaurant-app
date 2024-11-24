import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddCuisine() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setcategoryId] = useState(0);
  // console.log(name);
  // console.log(categoryId);

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/category`);
      //   console.log(data.category);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSumbit(e) {
    e.preventDefault();
    try {
      const body = { name, description, price: +price, imgUrl: imgUrl, stock: +stock, categoryId: +categoryId };

      const { data } = await axios.post(`https://server.ragaram.site/cuisines`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate(`/`);
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
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <div className="flex justify-center mb-20">
        <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-96 mt-5">
          <h2 className="text-white text-xl font-bold mb-6 text-center">Create Cuisine</h2>
          <form className="space-y-6" onSubmit={handleSumbit}>
            {/* Name Field */}
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input name="name" type="text" placeholder="Name (e.g., Nasi Goreng)" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setName(e.target.value)} />
            </div>
            {/* Description Field */}
            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea name="description" placeholder="Description (e.g., Nasi goreng dengan bumbu khas Jawa yang gurih dan lezat.)" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" rows={4} defaultValue={""} onChange={(e) => setDescription(e.target.value)} />
            </div>
            {/* Price Field */}
            <div>
              <label className="block text-white font-medium mb-2">Price</label>
              <input name="price" type="number" placeholder="Price (e.g., 20000)" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setPrice(e.target.value)} />
            </div>
            {/* Image URL Field */}
            <div>
              <label className="block text-white font-medium mb-2">Image URL</label>
              <input name="imgUrl" type="url" placeholder="Image URL (e.g., https://example.com/image.jpg)" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setImgUrl(e.target.value)} />
            </div>
            {/* Category ID Field */}
            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select name="categoryId" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setcategoryId(e.target.value)}>
                <option disabled value="">
                  Choose Your Category
                </option>
                {category.map((el) => {
                  // console.log(el)

                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
