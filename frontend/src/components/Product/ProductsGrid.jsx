import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProductsGrid = ({ products, loading, error, searchTerm }) => {
  if (loading) {
    return <p className="text-center text-gray-600">Loading....</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          No products found {searchTerm && `for "${searchTerm}"`}
        </h2>
        <p className="text-gray-500 mt-2">
          Try searching for something else or browse our collections.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-3 bg-[#E63946] text-white font-semibold rounded-lg 
           shadow-md hover:bg-[#C02739] transition-all duration-300"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {/* Product Image */}
            <div className="w-full aspect-[4/5] mb-4 rounded-lg overflow-hidden bg-gray-100 flex">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Product Name */}
            <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
              {product.name}
            </h3>

            {/* Product Price */}
            <p className="text-lg font-bold text-gray-900">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsGrid;
