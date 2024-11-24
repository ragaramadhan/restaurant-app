import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
export default function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //   console.log(password);
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const body = { email, password, phoneNumber: phonenumber, address };

      const { data } = await axios.post(`https://server.ragaram.site/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      //   console.log(data);
      navigate(`/`);

      Toastify({
        text: data.name,
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
      //   console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 30000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FA8072",
          color: "#000000",
        },
      }).showToast();
    }
  }
  return (
    <>
      <div className="mt-5 flex justify-center">
        <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-white text-xl font-bold mb-6 text-center">Register</h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input name="password" type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* Phone Number Field */}
            <div>
              <label className="block text-white font-medium mb-2">Phone Number</label>
              <input name="phoneNumber" type="text" placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setPhonenumber(e.target.value)} />
            </div>
            {/* Address Field */}
            <div>
              <label className="block text-white font-medium mb-2">Address</label>
              <textarea name="address" placeholder="Address" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" rows={3} onChange={(e) => setAddress(e.target.value)} />
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
