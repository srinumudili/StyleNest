/* eslint-disable react/prop-types */
import { IoIosClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-4/5 sm:w-1/2 md:w-[28rem] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col border-l ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={toggleCartDrawer}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <IoIosClose className="h-8 w-8 text-gray-600" />
        </button>
      </div>

      {/* Cart Contents (Scrollable) */}
      <div className="flex-grow overflow-y-auto p-4">
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty 🛍️</p>
        )}
      </div>

      {/* Checkout Button (Fixed at Bottom) */}
      {cart && cart?.products?.length > 0 && (
        <div className="p-4 sticky bottom-0 bg-white border-t shadow-md">
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg w-full hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
          <p className="text-sm text-gray-500 text-center mt-2">
            💡 Taxes & shipping costs calculated at checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
