import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../src/components/Navbar";

export default function Detail() {
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const { id } = useParams();

  async function getDetail() {
    try {
      const { data } = await axios.get(`https://server.ragaram.site/pub/cuisines/${id}`);
      setImgUrl(data.cuisine.imgUrl);
      setDescription(data.cuisine.description);
      setName(data.cuisine.name);
      setPrice(data.cuisine.price);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-6 mt-10">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full">
            {/* Gambar Cuisine */}
            <img src={imgUrl} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
          </div>

          {/* Detail Info */}
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800 mb-2">{name}</h1>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Price:</strong> Rp.{price.toLocaleString()}
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
