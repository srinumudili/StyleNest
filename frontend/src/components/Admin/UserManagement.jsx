import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { FaUser, FaTrash, FaUsersCog } from "react-icons/fa";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchUsers());
    }
  }, [user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>

      {/* Add User Form */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add New User
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-start space-y-3"
          >
            <div className="flex items-center space-x-3">
              <FaUser className="text-blue-500 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="w-full">
              <label className="text-gray-600 text-sm">Role</label>
              <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                <FaUsersCog className="text-gray-500" />
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash />
              <span>Delete User</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
