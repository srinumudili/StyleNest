import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/collection/all?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm(""); // Reset input after search
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Search Icon Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleSearchToggle}
          className="p-2 rounded-full hover:text-black"
        >
          <CiSearch className="h-6 w-6" />
        </button>
      )}

      {/* Search Bar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-16 bg-[#14213D] shadow-lg flex items-center justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-2xl flex items-center px-4"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border bg-gray-100 text-black rounded-md focus:outline-none placeholder-gray-700 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-10 text-gray-600 hover:text-black"
            >
              <CiSearch className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={handleSearchToggle}
              className="absolute right-3 text-gray-600 hover:text-black"
            >
              <IoIosClose className="h-7 w-7" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
