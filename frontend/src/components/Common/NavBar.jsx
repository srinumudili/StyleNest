import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const menuLinks = [
    { path: "/collection/all?gender=Men", label: "Men" },
    { path: "/collection/all?gender=Women", label: "Women" },
    { path: "/collection/all?category=Top Wear", label: "Tops" },
    { path: "/collection/all?category=Bottom Wear", label: "Bottoms" },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between  px-6 bg-[#14213D] text-gray-100">
        {/* Logo */}
        <Link className="text-xl font-semibold text-white" to="/">
          StyleNest
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-8">
          {menuLinks.map(({ path, label }) => (
            <Link
              key={label}
              to={path}
              className="text-gray-300 hover:text-white text-sm font-medium uppercase whitespace-nowrap transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Admin Panel (Only for Admin Users) */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-orange-500 hover:bg-orange-700 px-3 py-1 text-white text-sm font-medium rounded"
            >
              Admin
            </Link>
          )}

          {/* Profile Icon */}
          <Link to="/profile" aria-label="Profile">
            <CiUser className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" />
          </Link>

          {/* Cart Icon with Badge */}
          <button
            className="relative hover:text-white transition-colors duration-300"
            onClick={() => setDrawerOpen(true)}
          >
            <CiShoppingCart className="w-6 h-6 text-gray-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* SearchBar */}
          <div>
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            aria-label="Open Menu"
            onClick={() => setNavDrawerOpen(true)}
          >
            <RxHamburgerMenu className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30"
          onClick={() => setNavDrawerOpen(false)}
        >
          <div
            className="fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 bg-[#14213D] text-white shadow-lg transform transition-transform duration-300 h-full p-5"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Menu</h2>
              <button
                onClick={() => setNavDrawerOpen(false)}
                aria-label="Close Menu"
              >
                <IoIosClose className="h-7 w-7 text-white hover:text-gray-300" />
              </button>
            </div>
            <nav className="flex flex-col space-y-3">
              {menuLinks.map(({ path, label }) => (
                <Link
                  key={label}
                  to={path}
                  className="text-gray-300 hover:text-white text-sm font-medium uppercase transition-colors duration-300"
                  onClick={() => setNavDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
