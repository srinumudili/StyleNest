import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyster", "Silk"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...(newFilters[name] || []), value]
        : newFilters[name].filter((item) => item !== value);
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 w-64 bg-white border-r">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Filters</h3>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Category</h4>
        {categories.map((category) => (
          <label key={category} className="block">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Gender</h4>
        {genders.map((gender) => (
          <label key={gender} className="block">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <label key={color} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filters.color === color}
                onChange={handleFilterChange}
                className="hidden"
              />
              <span
                className={`inline-block w-6 h-6 rounded-full border ${
                  filters.color === color ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              ></span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Size</h4>
        {sizes.map((size) => (
          <label key={size} className="block">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {size}
          </label>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Material</h4>
        {materials.map((material) => (
          <label key={material} className="block">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {material}
          </label>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Price Range</h4>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
