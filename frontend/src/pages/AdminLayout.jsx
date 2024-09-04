import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

export default function AdminLayout() {
  return (
    <div>
      <HeaderAdmin />
      <div className="pt-20"> {/* Adjust top padding to account for fixed header */}
        <Outlet /> {/* This will render the matching child route */}
      </div>
    </div>
  );
}
