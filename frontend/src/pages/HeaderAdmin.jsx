import { Link, useNavigate } from "react-router-dom";
import { Cake, Clock9, Home, LogOut } from "lucide-react";

export default function HeaderAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/admin");
  };

  return (
    <>
      <header className="bg-purple-700 text-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="flex space-x-4">
            <Link
              to="/admin/dashboard"
              className="hover:bg-purple-800 px-4 py-2 rounded-md"
            >
              <Home size={24} className="inline mr-2" />
              Dashboard
            </Link>
            <Link
              to="/admin/manage-products"
              className="hover:bg-purple-800 px-4 py-2 rounded-md"
            >
              <Cake size={24} className="inline mr-2"/>
              Product
            </Link>
            <Link
              to="/admin/orders"
              className="hover:bg-purple-800 px-4 py-2 rounded-md"
            >
              <Clock9 size={24} className="inline mr-2" />
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="hover:bg-purple-800 px-4 py-2 rounded-md"
            >
              <LogOut size={24} className="inline mr-2" />
              Logout
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
