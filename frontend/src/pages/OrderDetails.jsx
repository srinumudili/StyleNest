import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Order Details
      </h2>

      {!selectedOrder ? (
        <p className="text-gray-600 text-center">No order details found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: #{selectedOrder._id}
              </h3>
              <p className="text-gray-500">
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedOrder.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {selectedOrder.isPaid ? "Paid" : "Pending"}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full mt-2 ${
                  selectedOrder.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {selectedOrder.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>
          </div>

          {/* Customer, Payment, and Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Payment Info
              </h4>
              <p className="text-gray-600">
                Method: {selectedOrder.paymentMethod}
              </p>
              <p
                className={`font-medium ${
                  selectedOrder.isPaid ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedOrder.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Shipping Address
              </h4>
              <p className="text-gray-600">
                {selectedOrder.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Products
            </h4>
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-center">Unit Price</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {selectedOrder.orderItems.map((item) => (
                  <tr
                    key={item.productId}
                    className="border-b last:border-none"
                  >
                    <td className="px-4 py-3 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Link
              to="/my-orders"
              className="text-blue-600 font-medium hover:underline"
            >
              ⬅ Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
