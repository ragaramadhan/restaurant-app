import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(e) {
    // karena submit itu ada refresh by default
    e.preventDefault();
    try {
      const { data } = await axios.post(`https://server.ragaram.site/login`, { email, password });
      // console.log(data);

      localStorage.setItem("access_token", data.access_token);
      navigate(`/`);
      Toastify({
        text: "Login success",
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

      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
    }
  }
  return (
    <>
      <div className="bg-cyan-200 flex items-center justify-center h-screen">
        <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-96">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <input name="email" type="email" placeholder="Input your email ..." className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Password Field */}
            <div>
              <input name="password" type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
