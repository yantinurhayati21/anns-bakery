import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/ProductUser.jsx";
import ManageProducts from "./pages/ManageProducts.jsx";
import Checkout from "./pages/checkout.jsx";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import RegisterAdmin from "./pages/RegisterAdmin.jsx";
import Orders from "./components/Orders.jsx";
import DetailOrder from "./components/DetailOrder.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/login/customer", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/login/admin", element: <LoginAdmin /> },
      { path: "/register-admin", element: <RegisterAdmin /> },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "admin",
        element: <AdminLayout />, // Admin layout untuk halaman admin
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "orders", element: <Orders /> },
          { path: "detail-orders", element: <DetailOrder /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
