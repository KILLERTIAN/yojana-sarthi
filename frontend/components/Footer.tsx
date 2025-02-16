import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-xl font-bold mb-3">Yojana Sarthi</h2>
          <p className="text-gray-400">
            Helping citizens find the right government schemes effortlessly.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/scheme" className="text-gray-400 hover:text-white transition duration-300">Schemes</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition duration-300">
              <Facebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition duration-300">
              <Twitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition duration-300">
              <Instagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl transition duration-300">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Yojana Sarthi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
