import React, { useEffect, useState } from "react";

export default function Checkout({ products, counts }) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [dataReq, setDataReq] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const [transferProof, setTransferProof] = useState();
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newDataReq = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: counts[product.id],
      total_price: product.price * counts[product.id],
      image: product.image_url,
    }));
    setDataReq([...dataReq, ...newDataReq]);
  }, [products, counts]);

  const calculateTotalHarga = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * counts[product.id];
    });
    return total;
  };

  const calculateTotalAmount = () => {
    let total = 0;
    products.forEach((product) => {
      total += counts[product.id];
    });
    return total;
  };

  const handlePayment = async () => {
    if (!transferProof) {
      setUploadError("Please upload proof of transfer.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", transferProof);

    try {
      await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const dataRequest = {
        total_price: calculateTotalHarga(),
        amount: calculateTotalAmount(),
        customer_name: customerName,
        customer_address: customerAddress,
        data: dataReq,
      };

      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRequest),
      });

      const result = await response.json();
      console.log("Transaction successful", result);
      setTimeout(() => {
        setOrderId(result.data.id);
        setIsLoading(false);
      }, 2000); // Simulate loading time
    } catch (error) {
      console.error("Error in transaction", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-purple-200 h-32 w-32 mb-4"></div>
          <p className="text-lg font-semibold text-purple-700">Processing your order...</p>
        </div>
      ) : orderId ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-700 animate-pulse">
            Thank You for Your Purchase!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Thank you for your purchase! Your order ID is <span className="font-semibold text-purple-600">{orderId}</span>.
          </p>
          <p className="text-md text-gray-700 mb-4">
            Your order is being processed and will be delivered to you within the next 3-5 business days.
          </p>
          <p className="text-md text-gray-700 mb-4">
            We hope you enjoy your order! If you have any questions, feel free to contact us.
          </p>
          <p className="text-md text-gray-700">
            We look forward to serving you again. Have a great day!
          </p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
            Checkout
          </h2>
          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block text-lg font-semibold text-gray-700"
            >
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="customerAddress"
              className="block text-lg font-semibold text-gray-700"
            >
              Customer Address
            </label>
            <textarea
              id="customerAddress"
              placeholder="Enter your address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="transferProof"
              className="block text-lg font-semibold text-gray-700"
            >
              Upload Proof of Transfer
            </label>
            <input
              type="file"
              onChange={(e) => setTransferProof(e.target.files[0])}
              className="w-full p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            {uploadError && (
              <p className="text-red-500 text-sm mt-2">{uploadError}</p>
            )}
          </div>
          <div className="text-center mb-6">
            <p className="text-md font-semibold text-purple-600">
              Payment is only available via bank transfer.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4 text-purple-700">
              Total: <span className="text-purple-600">Rp.{calculateTotalHarga()}</span>
            </h4>
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
