import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, navigate, dispatch]);

  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg my-16">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        🎉 Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          {/* Order Info */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Order ID: <span className="text-blue-600">{checkout._id}</span>
              </h2>
              <p className="text-gray-500 text-sm">
                📅 Order Date:{" "}
                {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-700 bg-green-100 px-3 py-1 rounded-lg shadow-md">
              🚚 Estimated Delivery:{" "}
              {calculateEstimateDelivery(checkout.createdAt)}
            </p>
          </div>

          {/* Ordered Items */}
          <div className="mb-8 border-t pt-4">
            {checkout.checkoutItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h4 className="text-md font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-md font-semibold text-gray-900">
                    ${item.price}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment & Delivery Info */}
          <div className="grid grid-cols-2 gap-6">
            {/* Payment Info */}
            <div className="p-4 rounded-lg border bg-white shadow-sm">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                💳 Payment
              </h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Delivery Info */}
            <div className="p-4 rounded-lg border bg-white shadow-sm">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                📦 Delivery Address
              </h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
