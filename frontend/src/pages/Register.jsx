import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImg from "../assets/Register.jpg";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(
          mergeCart({
            guestId,
            userId: user?._id,
          })
        ).then(() => navigate(isCheckoutRedirect ? "/checkout" : "/"));
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <form
          className="w-full max-w-md bg-white border rounded-lg shadow-lg p-8 md:p-12"
          onSubmit={handleSubmit}
        >
          {/* Title & Subtitle */}
          <div className="flex flex-col justify-center items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Join <span className="text-pink-500">StyleNest</span> Today
            </h2>
            <p className="text-gray-600 text-sm">
              Create an account to start shopping.
            </p>
          </div>

          {/* Full Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Creating Your Account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-pink-500 font-semibold hover:underline"
            >
              Login Here
            </Link>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img
          src={registerImg}
          alt="Register Illustration"
          className="w-full h-screen object-cover rounded-l-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Register;
