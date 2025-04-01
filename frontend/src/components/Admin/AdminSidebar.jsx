import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          StyleNest
        </Link>
      </div>
      <h2 className="text-xl font-medium text-center mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white flex items-center py-3 px-4 space-x-2 rounded"
              : "text-gray-300 hover:bg-gray-700  hover:text-white px-4 py-3 space-x-2 rounded flex items-center"
          }
          to="/admin/users"
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white flex items-center py-3 px-4 space-x-2 rounded"
              : "text-gray-300 hover:bg-gray-700  hover:text-white px-4 py-3 space-x-2 rounded flex items-center"
          }
          to="/admin/products"
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white flex items-center py-3 px-4 space-x-2 rounded"
              : "text-gray-300 hover:bg-gray-700  hover:text-white px-4 py-3 space-x-2 rounded flex items-center"
          }
          to="/admin/orders"
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white flex items-center py-3 px-4 space-x-2 rounded"
              : "text-gray-300 hover:bg-gray-700  hover:text-white px-4 py-3 space-x-2 rounded flex items-center"
          }
          to="/"
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white w-full rounded py-2 px-4 flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
