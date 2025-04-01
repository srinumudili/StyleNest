import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import SortOptions from "../components/Product/SortOptions";
import ProductsGrid from "../components/Product/ProductsGrid";
import FilterSidebar from "../components/Product/FilterSideBar";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const queryParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  // Extract search term from query params
  const searchTerm = queryParams.search || "";

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, queryParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Optimized: Memoized toggle handler
  const toggleHandler = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // ✅ Optimized: Memoized outside click handler
  const handleClickOutside = useCallback((e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="flex flex-col lg:flex-row mt-20">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleHandler}
        className="lg:hidden p-2 border flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 overflow-y-auto bg-white w-64 
          transition-transform duration-500 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${products.length > 0 && "lg:static lg:translate-x-0 lg:w-3/5"}`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 lg:p-8 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold uppercase mb-6 text-gray-800">
          {searchTerm ? `Search results for "${searchTerm}"` : "All Collection"}
        </h2>

        {/* Sort Options */}
        <div className="relative mb-4">
          <SortOptions />
        </div>

        {/* Products Grid - Pass searchTerm */}
        <ProductsGrid
          products={products}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default Collection;
