import React from 'react';

const FooterAdmin = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} Ann's Bakery. All rights reserved.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <a
            href="#"
            className="mx-2 hover:text-gray-300 transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="mx-2 hover:text-gray-300 transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="mx-2 hover:text-gray-300 transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
