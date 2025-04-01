import { useDispatch, useSelector } from "react-redux";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="mt-8 max-w-8xl py-10 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Section */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600">
            {user?.name ? user.name[0] : "?"}
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-semibold mt-4">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-5 bg-red-500 w-full py-2 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Right Orders Section */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Profile;
