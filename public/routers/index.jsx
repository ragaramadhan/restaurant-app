import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/components/HomePage";
import Detail from "../views/Detail";
import Navbar from "../src/components/Navbar";
import BaseLayout from "../views/BaseLayout";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
