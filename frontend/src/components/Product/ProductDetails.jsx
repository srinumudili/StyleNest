/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductsGrid from "./ProductsGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus")
      return setQuantity((prevQuantity) => prevQuantity + 1);
    if (action === "minus" && quantity > 1)
      return setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding  to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    try {
      await dispatch(
        addToCart({
          productId: productFetchId,
          quantity,
          userId: user?._id,
          guestId,
          size: selectedSize,
          color: selectedColor,
        })
      ).unwrap(); // Ensures correct promise handling

      toast.success("Product added to the cart...", { duration: 1000 });
    } catch (error) {
      toast.error(error?.message || "Failed to add to cart.");
    } finally {
      setIsButtonDisabled(false); // Ensures button is re-enabled in all cases
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedProduct) return <p>Product not found.</p>;
  return (
    <div className="p-6 mt-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Side Thumbnails */}
          {selectedProduct?.images?.length > 0 && (
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  } hover:shadow-md`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          )}

          {/* Main Product Image */}
          {mainImage && (
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {/* Mobile Thumbnails */}
          {selectedProduct?.images?.length > 0 && (
            <div className="md:hidden flex space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  } hover:shadow-md`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          )}

          {/* Right Side Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-500 text-lg font-medium mb-1 line-through">
              {selectedProduct.originalPrice &&
                `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-2xl text-red-600 font-bold mb-4">
              ${selectedProduct.price}
            </p>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedColor === color
                        ? "border-4 border-black scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border transition-all ${
                      selectedSize === size
                        ? "bg-black text-white scale-105 shadow-md"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => handleQuantityChange("minus")}
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900 shadow-md"
              }`}
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
            >
              {isButtonDisabled ? "Adding..." : "🛒 Add To Cart"}
            </button>

            {/* Product Details Table */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Product Details
              </h3>
              <table className="w-full text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium">Brand</td>
                    <td className="py-2">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Material</td>
                    <td className="py-2">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            You May Also Like
          </h2>
          <ProductsGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
