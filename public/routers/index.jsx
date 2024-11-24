import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import Detail from "../views/Detail";
import Navbar from "../src/components/Navbar";
import BaseLayout from "../views/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
