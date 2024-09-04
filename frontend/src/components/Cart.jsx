import { useState } from "react";
import { BookmarkX } from "lucide-react";
import Checkout from "../pages/checkout";

export default function Cart({
  cartItems,
  countsCart,
  showCart,
  showCartDetails,
}) {
  const countsTamp = Object.entries(countsCart).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const [counts, setCounts] = useState(countsTamp);
  const productsTamp = Object.values(cartItems);
  const [products, setProducts] = useState(productsTamp);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const increment = (productId) => {
    setCounts({
      ...counts,
      [productId]: (counts[productId] || 0) + 1,
    });
  };

  const decrement = (productId) => {
    if (counts[productId] && counts[productId] > 0) {
      setCounts({
        ...counts,
        [productId]: counts[productId] - 1,
      });
    }
  };

  const calculateTotalHarga = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * (counts[product.id] || 0);
    });
    return total;
  };

  const showCheckoutCakes = () => {
    setShowCheckout(!showCheckout);
  };

  return (
    <>
      {showCart && (
        <>
          {showCheckout ? (
            <Checkout
              products={products}
              counts={counts}
              showCheckout={showCheckout}
            />
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-2xl font-bold">Keranjang</h2>
                  <button
                    onClick={() => showCartDetails({})}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <BookmarkX size={30} />
                  </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto max-h-[400px]">
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
                      >
                        <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border border-gray-300">
                          <img
                            className="w-full h-full object-cover"
                            src={item.image_url}
                            alt={item.product_name}
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-lg font-semibold">
                            {item.product_name}
                          </h3>
                          <p className="text-gray-600">Rp.{item.price}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <button
                              className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                              onClick={() => decrement(item.id)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full">
                              {counts[item.id] || 0}
                            </span>
                            <button
                              className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                              onClick={() => increment(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <BookmarkX
                            size={24}
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600">
                      Keranjang Anda kosong
                    </p>
                  )}
                </div>

                <div className="p-6 border-t">
                  <h4 className="text-lg font-bold">
                    Total Harga:{" "}
                    <span className="text-blue-500">
                      Rp.{calculateTotalHarga()}
                    </span>
                  </h4>
                  <button
                    className={`w-full mt-4 py-2 text-lg rounded-md ${
                      products.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={showCheckoutCakes}
                    disabled={products.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
