/* eslint-disable react/prop-types */
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle quantity adjustment
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  // Handle product removal
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        userId,
        guestId,
        size,
        color,
      })
    );
  };

  return (
    <div className="space-y-4">
      {cart.products.map((product) => (
        <div
          key={product.productId}
          className="flex justify-between items-start bg-gray-50 rounded-lg p-4 shadow-md"
        >
          {/* Product Image & Details */}
          <div className="flex items-start space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-24 w-20 object-cover rounded-lg border"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Size:</span> {product.size} |{" "}
                <span className="font-medium">Color:</span> {product.color}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-2 space-x-3">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  -
                </button>
                <span className="text-lg text-black font-medium">
                  {product.quantity}
                </span>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price & Remove Button */}
          <div className="flex flex-col items-end">
            <p className="text-lg font-semibold text-gray-900">
              ${product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
              className="text-red-600 hover:text-red-800 transition mt-2"
            >
              <RiDeleteBin6Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
