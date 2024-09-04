import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About Us</h2>
          <p className="text-gray-400">
            Welcome to ANNS BAKERY! We offer the finest selection of cakes,
            pastries, and baked goods. Every item is baked fresh daily with love
            and care.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/shop"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/shop-by-occasion"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shop by Occasion
              </a>
            </li>
            <li>
              <a
                href="/custom-cake"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Custom Cake
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/corporate-hamper"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Corporate Hamper
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-gray-400">Have any questions? Reach out to us!</p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:contact@anns-bakery.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        &copy; 2024 ANNS BAKERY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
