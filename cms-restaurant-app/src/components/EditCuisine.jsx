import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
export default function EditCuisine() {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch categories
  async function fetchCategory() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/category`);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch cuisine data for editing
  async function fetchCuisine() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      //   console.log(data.cuisine.categoryId);

      setFormData({
        name: data.cuisine.name,
        description: data.cuisine.description,
        price: data.cuisine.price,
        imgUrl: data.cuisine.imgUrl,
        categoryId: data.cuisine.categoryId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchCuisine();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://server.ragaram.site/cuisines/${id}`, formData, {
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
      Toastify({
        text: error.response.data.message,
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
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-xl font-bold mb-6 text-center">Edit Cuisine</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-white font-medium mb-2">Name</label>
            <input name="name" type="text" placeholder="Name (e.g., Nasi Goreng)" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" />
          </div>
          {/* Description Field */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea name="description" placeholder="Description (e.g., Nasi goreng dengan bumbu khas Jawa yang gurih dan lezat.)" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" rows={4} />
          </div>
          {/* Price Field */}
          <div>
            <label className="block text-white font-medium mb-2">Price</label>
            <input name="price" type="number" placeholder="Price (e.g., 20000)" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" />
          </div>
          {/* Image URL Field */}
          <div>
            <label className="block text-white font-medium mb-2">Image URL</label>
            <input name="imgUrl" type="url" placeholder="Image URL (e.g., https://example.com/image.jpg)" value={formData.imgUrl} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" />
          </div>
          {/* Category ID Field */}
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
              {/* <option disabled value="">
              Choose Your Category
            </option> */}
              {category.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
