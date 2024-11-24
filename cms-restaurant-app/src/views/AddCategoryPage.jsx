import { useNavigate } from "react-router-dom";
import FormCategory from "../components/FormCategory";
import Toastify from "toastify-js";
import axios from "axios";
export default function AddCategoryPage() {
  const navigate = useNavigate();
  const string = `Add Category`;
  async function handleSumbit(e, category) {
    try {
      e.preventDefault();
      console.log(category);

      const { data } = await axios.post(
        `https://server.ragaram.site/category`,
        { name: category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      //   console.log(data);

      navigate(`/category`);
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

  //   useEffect(() => {
  //     console.log(category);
  //   }, [category]);
  return (
    <>
      <FormCategory handleSumbit={handleSumbit} PropName={string} />
    </>
  );
}
