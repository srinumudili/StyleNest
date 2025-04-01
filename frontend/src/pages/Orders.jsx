import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading)
    return (
      <p className="text-center text-blue-600 animate-pulse text-lg font-medium">
        🔄 Loading your orders...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold text-lg">
        ❌ Error: {error}
      </p>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg my-12">
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-4 mb-6">
        🛍️ My Orders
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-300 rounded-lg bg-gray-50">
          <thead className="bg-blue-600 text-white uppercase text-sm">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Shipping</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-100 transition cursor-pointer"
                  onClick={() => handleRowClick(order._id)}
                >
                  {/* Order Image */}
                  <td className="p-4">
                    {order.orderItems.length > 0 && (
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        className="rounded-lg w-14 h-14 object-cover border shadow-md"
                      />
                    )}
                  </td>

                  {/* Order ID */}
                  <td className="p-4 font-semibold text-gray-900">
                    #{order._id}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Shipping Address */}
                  <td className="p-4 text-gray-700">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </td>

                  {/* Number of Items */}
                  <td className="p-4 font-medium text-gray-900">
                    {order.orderItems.length}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-semibold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-gray-500 text-center">
                  🚫 No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
