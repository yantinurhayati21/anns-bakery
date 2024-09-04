import { Boxes, Clock3, Users, ListOrdered } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "../components/FooterAdmin";

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const images = [
    "https://i.pinimg.com/564x/27/e1/48/27e14884d0f5907612f26d41a2000612.jpg",
    "https://i.pinimg.com/564x/06/f8/d2/06f8d2cea4fd8a4c8cafb91ef446c1fb.jpg",
    "https://i.pinimg.com/564x/15/2d/1a/152d1a99bbc2b7240f78006093deb48d.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!Cookies.get("token")) location.href = "/login/admin";
  else
    return (
      <>
        <div className="pt-20">
          <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-8">
              Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-200">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700">
                    Product
                  </h3>
                  <p className="text-gray-500">Manage your product inventory</p>
                </div>
                <Boxes size={48} className="text-purple-700" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-200">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700">
                    Orders
                  </h3>
                  <p className="text-gray-500">Manage customer orders</p>
                </div>
                <ListOrdered size={48} className="text-purple-700" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-200">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700">
                    History
                  </h3>
                  <p className="text-gray-500">View transaction history</p>
                </div>
                <Clock3 size={48} className="text-purple-700" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition duration-200">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700">
                    Unique Visitors
                  </h3>
                  <p className="text-gray-500">Track site visitors</p>
                </div>
                <Users size={48} className="text-purple-700" />
              </div>
            </div>

            {/* About Ann's Bakery Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-purple-700 mb-6">
                About Ann's Bakery
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                      Welcome to Ann's Bakery
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Ann's Bakery has been serving delicious and fresh baked
                      goods for over 20 years. Our commitment to quality and
                      customer satisfaction has made us a favorite in the
                      community.
                    </p>
                    <p className="text-gray-600">
                      Whether you're in the mood for a classic cake, a batch of
                      cookies, or a custom-designed dessert, we've got something
                      for every occasion. Visit us today to experience the magic
                      of freshly baked goods!
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative w-full h-64 bg-gray-200 overflow-hidden rounded-lg">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Cake ${index + 1}`}
                          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${
                            index === currentSlide
                              ? "bg-purple-700"
                              : "bg-gray-300"
                          }`}
                          onClick={() => goToSlide(index)}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </>
    );
}
