import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products?.length > 0) {
      const response = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (response.payload && response.payload._id) {
        setCheckoutId(response.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    // Extract transaction ID correctly
    const transactionId =
      details?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (!transactionId) {
      console.error("Transaction ID not found in PayPal response.");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: { transactionId } }, // Correct format
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment Error:", error);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p className="text-center text-lg">Your cart is empty</p>;

  return (
    <div className="max-w-5xl mx-auto my-6 py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Shipping Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 border-b pb-3 mb-5">
          Checkout
        </h2>
        <form onSubmit={handleCreateCheckout} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              disabled
            />
          </div>

          {/* Shipping Details */}
          <h3 className="text-lg font-semibold text-gray-700">
            Delivery Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  firstName: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  lastName: e.target.value,
                })
              }
              required
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
              required
            />
          </div>

          <input
            type="text"
            placeholder="Country"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            required
          />

          {!checkoutId ? (
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Continue to Payment
            </button>
          ) : (
            <PayPalButton
              amount={cart.totalPrice}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-emerald-50 shadow-lg rounded-lg p-8 border border-emerald-300">
        <h3 className="text-xl font-semibold border-b pb-3 mb-5 text-emerald-700">
          Order Summary
        </h3>
        {cart.products.map((product, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <div className="flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 mr-4 rounded-lg"
              />
              <div>
                <h3 className="text-md text-gray-800">{product.name}</h3>
                <p className="text-gray-500">
                  Size: {product.size}, Color: {product.color}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              ${product.price.toLocaleString()}
            </p>
          </div>
        ))}
        {/* Total Price */}
        <div className="flex justify-between mt-4 pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900">Total Price:</h3>
          <p className="text-xl font-bold text-emerald-700">
            ${cart.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
