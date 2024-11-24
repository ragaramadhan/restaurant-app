import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormCategory({ handleSumbit, PropName }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);
  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-white text-xl font-bold mb-6 text-center">Add Category</h2>
          <form className="space-y-6 " onSubmit={(e) => handleSumbit(e, category)}>
            {/* Name Category Field */}
            <div>
              <label className="block text-white font-medium mb-2">Name Category</label>
              <input value={name} name="name" type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Enter category name" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" />
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                {PropName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
