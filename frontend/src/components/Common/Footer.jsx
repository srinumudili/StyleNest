/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <section>
          <h3 className="text-white font-medium mb-4">
            Join Our Fashion Family
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Stay ahead in fashion! Get updates on the latest trends, exclusive
            deals, and special events.
          </p>
          <p className="text-pink-400 font-semibold mt-2">
            Subscribe now & enjoy 10% off your first order!
          </p>
          <form className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 bg-gray-800 focus:outline-none border border-gray-700 rounded-l-md w-full focus:ring-2 focus:ring-pink-400 placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white hover:bg-pink-700 rounded-r-md transition-all"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Navigation Links */}
        <nav>
          <h3 className="text-white mb-4 font-medium">Shop</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <h3 className="text-white mb-4 font-medium">Customer Support</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-pink-400 transition">
                Why Choose Us?
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media */}
        <section>
          <h3 className="text-white mb-4 font-medium">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              className="text-gray-400 hover:text-red-600 transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>

          {/* Call us */}
          <div className="flex items-center space-x-2 mt-4">
            <FaPhoneAlt className="text-gray-400" size={20} />
            <a
              href="tel:+1234567890"
              className="text-gray-400 hover:text-green-500 transition font-medium"
            >
              +1 (234) 567-890
            </a>
          </div>
        </section>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto border-t mt-12 text-center pt-6 border-gray-700">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()}, StyleNest. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
