import { useState, useEffect } from "react";
import { Eye, CheckCircle, ArrowDown01, ArrowDown10 } from "lucide-react";
import DetailOrder from "./DetailOrder";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDetail = (order) => {
    setOrderId(order.id);
    setShowDetail(true);
  };

  const handleConfirmPayment = async (orderId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/confirm`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        fetchOrders();
      } else {
        console.error("Error confirming payment:", await response.text());
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    [order.id, order.customer_name, order.customer_address, order.date, order.total_price, order.total_product, order.status]
      .some(field => field.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  if (!Cookies.get("token")) navigate("/login/admin");
  else
  return (
    <>
      {showDetail ? (
        <DetailOrder orderId={orderId} setShowDetail={setShowDetail} />
      ) : (
        <div className="flex flex-col items-center p-8 bg-purple-50 min-h-screen">
          <div className="w-full max-w-5xl">
            <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
              Orders
            </h1>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 border border-gray-300 rounded-r-lg bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                {sortOrder === "asc" ? <ArrowDown01  size={20} /> : <ArrowDown10  size={20} />}
              </button>
            </div>
            {sortedOrders.length === 0 ? (
              <p className="text-center text-purple-700">Loading...</p>
            ) : (
              <table className="w-full text-left border-collapse shadow-lg">
                <thead>
                  <tr className="bg-purple-100 text-purple-900">
                    <th className="p-4">ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Customer Address</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Total Products</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-purple-200 transition-colors"
                    >
                      <td className="p-4 border-t">{order.id}</td>
                      <td className="p-4 border-t">{order.customer_name}</td>
                      <td className="p-4 border-t">{order.customer_address}</td>
                      <td className="p-4 border-t">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 border-t">Rp.{order.total_price.toLocaleString()}</td>
                      <td className="p-4 border-t">{order.total_product}</td>
                      <td
                        className={`p-4 border-t ${
                          order.status === "pending"
                            ? "text-yellow-500"
                            : order.status === "paid"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="p-4 border-t text-center">
                        <button
                          className="text-purple-600 hover:text-purple-900 mr-2"
                          onClick={() => handleDetail(order)}
                        >
                          <Eye size={20} />
                        </button>
                        {order.status === "pending" && (
                          <button
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleConfirmPayment(order.id)}
                          >
                            <CheckCircle size={20} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      <FooterAdmin />
    </>
  );
}
