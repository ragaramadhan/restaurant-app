import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";

export default function BaseLayout() {
  return (
    <>
      <div className="p-5">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
