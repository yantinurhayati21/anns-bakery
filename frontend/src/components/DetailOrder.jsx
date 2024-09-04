import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function DetailOrder({ orderId, setShowDetail }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `http://localhost:3000/api/orders/detailorder/${orderId}`,
        config
      );
      const data = await response.json();
      setOrderDetails(data.data);
    } catch (error) {
      console.error("Error fetching Order Details:", error);
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        navigate("/login");
      }
    }
  };

  const handleClose = () => {
    setShowDetail(false); // Close the detail view
    navigate("/admin/orders"); // Navigate back to orders
  };

  if (!Cookies.get("token")) navigate("/login/admin");
  else
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-700">Detail Order</h2>
          <button onClick={handleClose} className="text-purple-700 hover:text-purple-900">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-purple-200 rounded-md">
            <thead className="bg-purple-500 text-white">
              <tr>
                {["ID", "Gambar", "Nama Produk", "Harga Produk", "Jumlah", "Total Harga", "ID Order", "Waktu Dibuat"].map((heading) => (
                  <th key={heading} className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-200">
              {orderDetails.map((detail) => (
                <tr key={detail.id} className="hover:bg-purple-50">
                  <td className="py-4 px-6">{detail.id}</td>
                  <td className="py-4 px-6">
                    <img
                      src={detail.image}
                      alt={detail.product_name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6">{detail.product_name}</td>
                  <td className="py-4 px-6">Rp.{detail.product_price.toLocaleString()}</td>
                  <td className="py-4 px-6">{detail.amount}</td>
                  <td className="py-4 px-6">Rp.{detail.total_price.toLocaleString()}</td>
                  <td className="py-4 px-6">{detail.order_id}</td>
                  <td className="py-4 px-6">{new Date(detail.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
