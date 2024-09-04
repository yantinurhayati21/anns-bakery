import { useEffect, useState } from "react";
import { ShoppingCart, Info, Search } from "lucide-react";
import Card from "../components/Cart";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import ProductModal from "../components/ProductModal";
import Cookies from "js-cookie";

const ProductUser = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [images, setImages] = useState([
    "https://i.pinimg.com/474x/67/39/d3/6739d3bc35d0eddd3c37adfb40c4ffb2.jpg",
    "https://i.pinimg.com/474x/81/9b/aa/819baa9e4de92bd45fd657d2af6a3497.jpg",
    "https://i.pinimg.com/474x/64/14/a4/6414a49469eb0eba0d1d881fd28ad800.jpg",
  ]);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Start fade in
      }, 500); // Duration of fade out
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const showCartDetails = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cakes");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const decrement = (productId) => {
    if (counts[productId] && counts[productId] > 0) {
      setCounts({
        ...counts,
        [productId]: counts[productId] - 1,
      });
    }
  };

  const increment = (productId) => {
    setCounts({
      ...counts,
      [productId]: (counts[productId] || 0) + 1,
    });
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      setCartItems([...cartItems, product]);
    }

    increment(product.id);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    if (!Cookies.get("token")) {
      location.href = "/login/admin";
    } else
  return (
    <>
      <HeaderUser />
      {!showCart && (
        <>
          <div className="carousel relative overflow-hidden h-[80vh]">
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-purple-800">Our Products</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center gap-1">
                <Search className="absolute left-2 text-purple-500" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 bg-purple-100 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={showCartDetails} className="relative p-2">
                  <ShoppingCart size={30} className="text-purple-800" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-4">
            <label className="flex gap-2">
              <h1 className="font-semibold text-purple-800">Sort by:</h1>
              <select
                className="rounded-lg border-2 border-gray-300 h-9 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </label>
            <label className="flex gap-2">
              <h1 className="font-semibold text-purple-800">Order:</h1>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-lg border-2 border-gray-300 h-9 text-sm"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.image_url}
                  alt={product.name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-2">Rp.{product.price}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-fuchsia-600 hover:text-purple-800 transition"
                    >
                      <Info size={30} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showCart && (
        <Card
          cartItems={cartItems}
          countsCart={counts}
          showCart={showCart}
          showCartDetails={showCartDetails}
        />
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      <Footer />
    </>
  );
};

export default ProductUser;
