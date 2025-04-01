import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    totalOrders,
    totalSales,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Loading & Error Handling */}
      {productsLoading || ordersLoading ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : productsError ? (
        <p className="text-red-500 font-semibold">⚠️ Error: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500 font-semibold">⚠️ Error: {ordersError}</p>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Revenue Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-green-600">
                ${totalSales.toFixed(2)}
              </p>
            </div>

            {/* Orders Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Total Orders
              </p>
              <p className="text-3xl font-bold">{totalOrders}</p>
              <Link
                to="/admin/orders"
                className="text-blue-500 font-medium hover:underline"
              >
                Manage Orders →
              </Link>
            </div>

            {/* Products Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Total Products
              </p>
              <p className="text-3xl font-bold">{products.length}</p>
              <Link
                to="/admin/products"
                className="text-blue-500 font-medium hover:underline"
              >
                Manage Products →
              </Link>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Orders
            </h2>

            {orders.length > 0 ? (
              <div className="space-y-6 border-l-4 border-blue-500 pl-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="relative bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>

                    {/* Order Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order ID: {order._id}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-semibold">Customer:</span>{" "}
                          {order.user?.name}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Total Price:</span> $
                          {order.totalPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 mt-3 sm:mt-0 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* View Details */}
                    <Link
                      to={`/order/${order._id}`}
                      className="mt-4 inline-block text-blue-500 font-medium hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No recent orders found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
