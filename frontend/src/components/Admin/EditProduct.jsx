import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
    setIsUpdated(true);
  };

  const handleSizeChange = (e) => {
    setProductData({
      ...productData,
      sizes: e.target.value.split(",").map((size) => size.trim()),
    });
    setIsUpdated(true);
  };

  const handleColorChange = (e) => {
    setProductData({
      ...productData,
      colors: e.target.value.split(",").map((color) => color.trim()),
    });
    setIsUpdated(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          { url: data.imageUrl, altText: file.name },
        ],
      }));
      setUploading(false);
      setIsUpdated(true);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Count In Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="block text-lg font-medium text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Sizes & Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(",")}
              onChange={handleSizeChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(",")}
              onChange={handleColorChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Image</label>

            {/* Custom Upload Button */}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Choose File
              <input
                type="file"
                name="images"
                onChange={handleImageUpload}
                className="hidden" // Hide default input
              />
            </label>

            {/* Show Uploading Status */}
            {uploading && (
              <p className="text-sm text-gray-500 mt-2">
                Image is uploading...
              </p>
            )}

            {/* Display Uploaded Images */}
            <div className="flex gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={image.altText || "Product Image"}
                    className="w-20 h-20 object-cover rounded-lg shadow-md border"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            disabled={!isUpdated}
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
