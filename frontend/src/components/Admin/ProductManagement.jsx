import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/slices/adminProductSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  console.log(products);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchProducts());
    }
  }, [user, dispatch, navigate]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Product Management
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
            >
              <img
                src={product.images[0].url}
                alt={product.images[0].alttext || product.name}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600 text-sm">SKU: {product.sku}</p>
              <p className="text-gray-800 font-semibold">${product.price}</p>

              <div className="flex space-x-2 mt-3">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 flex items-center space-x-1 rounded transition"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 flex items-center space-x-1 rounded transition"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
