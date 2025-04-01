import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturedSection from "../components/Product/FeaturedSection";
import GenderCollectionSection from "../components/Product/GenderCollectionSection";
import NewArrivalsSection from "../components/Product/NewArrivalsSection";
import ProductDetails from "../components/Product/ProductDetails";
import ProductsGrid from "../components/Product/ProductsGrid";

import { fetchProductsByFilters } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    // Fetch the best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Gender Collection */}
      <section className="container mx-auto px-4 py-12">
        <GenderCollectionSection />
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <NewArrivalsSection />
      </section>

      {/* Best Seller */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-800">
          🌟 Best Seller
        </h2>
        {bestSellerLoading ? (
          <p className="text-center text-gray-500 animate-pulse text-lg">
            Loading Best Seller Product...
          </p>
        ) : bestSellerProduct ? (
          <div className="flex justify-center">
            <ProductDetails productId={bestSellerProduct._id} />
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg font-semibold">
            ❌ No Best Seller Product Found
          </p>
        )}
      </section>

      {/* Top Wear for Women */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Top Wears For Women
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading Top Wear Products...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products?.length > 0 ? (
          <ProductsGrid products={products} loading={loading} error={error} />
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 py-12">
        <FeaturedCollection />
      </section>

      <section className="container mx-auto px-4 py-12">
        <FeaturedSection />
      </section>
    </main>
  );
};

export default Home;
