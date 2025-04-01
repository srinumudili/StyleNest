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
    brand: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyster",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fahionista",
    "ChicStyle",
  ];

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
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  //Handling fliters
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  //URLParams
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
    const newprice = e.target.value;
    const newFilters = { ...filters, minPrice: 0, maxPrice: newprice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category  Filter */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block font-medium mb-2 text-gray-600"
        >
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              checked={filters.category === category}
              onChange={handleFilterChange}
            />
            <span className="text-gray-600">{category}</span>
          </div>
        ))}
      </div>
      {/* Gender  Filter */}
      <div className="mb-6">
        <label
          htmlFor="gender"
          className="block font-medium mb-2 text-gray-600"
        >
          Gender
        </label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color  Filter */}
      <div className="mb-6">
        <label htmlFor="color" className="block font-medium mb-2 text-gray-600">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              value={color}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
              type="button"
              onClick={handleFilterChange}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}

      <div className="mb-6">
        <label htmlFor="size" className="block font-medium mb-2 text-gray-600">
          Size
        </label>
        {sizes.map((size) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              name="size"
              checked={filters.size.includes(size)}
              value={size}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}

      <div className="mb-6">
        <label
          htmlFor="material"
          className="block font-medium mb-2 text-gray-600"
        >
          Material
        </label>
        {materials.map((material) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              name="material"
              checked={filters.material.includes(material)}
              value={material}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}

      <div className="mb-6">
        <label htmlFor="brand" className="block font-medium mb-2 text-gray-600">
          Brand
        </label>
        {brands.map((brand) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              name="brand"
              checked={filters.brand.includes(brand)}
              value={brand}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label
          htmlFor="priceRange"
          className="block font-medium mb-2 text-gray-600"
        >
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          onChange={handlePriceChange}
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          value={priceRange[1]}
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
