import { RouterProvider } from "react-router-dom";
import "toastify-js/src/toastify.css";
import router from "../routers";

function App() {
  return (
    <>
      <>
        <RouterProvider router={router} />
      </>
    </>
  );
}

export default App;
