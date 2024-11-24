import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
