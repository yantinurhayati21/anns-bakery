import React from "react";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";

const bestSellingCakes = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    image: "https://i.pinimg.com/474x/5c/d9/12/5cd91246e67fa06cfc6e2b0d752505a4.jpg",
    description: "Rich and decadent chocolate fudge cake topped with creamy chocolate ganache.",
  },
  {
    id: 2,
    name: "Vanilla Bean Cake",
    image: "https://i.pinimg.com/474x/45/b2/d4/45b2d4786bbd251b57f7ac97f2d6d261.jpg",
    description: "Light and fluffy vanilla bean cake with a hint of vanilla and topped with fresh berries.",
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    image: "https://i.pinimg.com/474x/bd/16/ff/bd16ffa43292b56b10b7bcb23bf87ae7.jpg",
    description: "Classic red velvet cake with cream cheese frosting and a touch of cocoa.",
  },
  {
    id: 4,
    name: "Carrot Cake",
    image: "https://i.pinimg.com/474x/da/c2/53/dac2530722d0aea6d1afa7030ba147e4.jpg",
    description: "Spiced carrot cake with a smooth cream cheese frosting and a sprinkle of walnuts.",
  },
  {
    id: 5,
    name: "Lemon Drizzle Cake",
    image: "https://i.pinimg.com/474x/14/41/76/1441762b7f980a84a93a17ea49a182bd.jpg",
    description: "Zesty lemon cake with a tangy lemon glaze and a hint of fresh lemon zest.",
  },
  {
    id: 6,
    name: "Strawberry Shortcake",
    image: "https://i.pinimg.com/564x/3a/45/b6/3a45b6db57e0b73e94ff43c212821d99.jpg",
    description: "Layers of fluffy vanilla cake with fresh strawberries and a light whipped cream.",
  },
];

function Home() {
  return (
    <>
      <HeaderUser />

      {/* Video Container */}
      <div className="video-container relative overflow-hidden py-8 px-8">
        <video
          className="w-full max-h-80 object-cover mx-auto"
          src="./video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Bakery Video"
        />
      </div>

      {/* About Ann's Bakery */}
      <div className="about-section px-8 py-16 bg-purple-100">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">About Ann's Bakery</h2>
        <p className="text-lg mb-4">
          At Ann's Bakery, we are passionate about creating the most delicious cakes using only the finest ingredients. Our team of expert bakers crafts each cake with care, ensuring that every bite is a delightful experience. From custom designs to classic favorites, we have something for every celebration.
        </p>
        <p className="text-lg">
          Our commitment to quality and creativity has made us a beloved bakery in the community. Visit us to enjoy freshly baked goods and personalized service that will make your special moments even more memorable.
        </p>
      </div>

      {/* Best-Selling Cakes */}
      <div className="best-selling-cakes px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Best-Selling Cakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellingCakes.map((cake) => (
            <div key={cake.id} className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-2">{cake.name}</h3>
                <p className="text-gray-600 mb-4">{cake.description}</p>
                <a
                  href="/products"
                  className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all"
                >
                  View Products
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
