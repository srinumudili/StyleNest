import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        className="border border-gray-300 p-2 rounded-lg shadow-sm text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
