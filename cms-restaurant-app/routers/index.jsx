import { createBrowserRouter, redirect } from "react-router-dom";
import Cuisines from "../src/components/Cuisines";
import Login from "../src/components/Login";
import BaseLayout from "../views/BaseLayout";
import AddCuisine from "../src/components/AddCuisine";
import Toastify from "toastify-js";
import AddUser from "../src/components/AddUser";
import EditCuisine from "../src/components/EditCuisine";
import Category from "../src/components/Category";
import FormCategory from "../src/components/FormCategory";
import AddCategoryPage from "../src/views/addCategoryPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please Login First",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Cuisines />,
      },
      {
        path: "/add",
        element: <AddCuisine />,
      },
      {
        path: "/add/user",
        element: <AddUser />,
      },
      {
        path: "/edit/:id",
        element: <EditCuisine />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/add/category",
        element: <AddCategoryPage />,
      },
    ],
  },
]);

export default router;
