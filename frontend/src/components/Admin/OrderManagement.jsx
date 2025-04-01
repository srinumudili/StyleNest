import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import { FaCheck, FaTruck } from "react-icons/fa";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [user, dispatch, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Order Management
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md p-4 rounded-lg border"
            >
              <p className="text-sm text-gray-600">Order ID: #{order._id}</p>
              <h3 className="text-lg font-semibold mt-2">{order.user?.name}</h3>
              <p className="text-gray-700 font-medium">
                ${order.totalPrice.toFixed(2)}
              </p>

              <span
                className={`px-3 py-1 text-sm font-semibold rounded-lg mt-2 inline-block ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

              <div className="mt-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleStatusChange(order._id, "Shipped")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-2 transition"
                >
                  <FaTruck />
                  <span>Ship Order</span>
                </button>
                <button
                  onClick={() => handleStatusChange(order._id, "Delivered")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-2 transition"
                >
                  <FaCheck />
                  <span>Deliver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
