import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const NewArrivalsSection = () => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  //Mouse Scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  //Button Scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // console.log({ scrollLeft, scrollWidth, clientWidth });
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  //Mouse Scroll
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); //prevents the default text selection while dragging;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => container.removeEventListener("scroll", handleScroll);
  }, [newArrivals]);

  return (
    <section className="relative py-8">
      <div className="container mx-auto text-center mb-8">
        <h3 className="text-3xl font-bold mb-3">Explore New Arrivals</h3>
        <p className="text-lg text-gray-600">
          Upgrade your look with our latest fashion arrivals, carefully curated
          to keep you on trend.
        </p>
      </div>
      {/* Scrollable Content */}
      <div
        className={`flex overflow-x-scroll space-x-6 p-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Scrollable buttons */}
        <button
          onClick={handleScrollLeft}
          className={`absolute left-0 top-1/2 translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 ${
            isAtStart ? "opacity-35 cursor-not-allowed" : ""
          }`}
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[300px] sm:min-w-[300px] lg:min-w-[350px] bg-white shadow-lg rounded-lg overflow-hidden relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
              draggable="false"
            />
            <div className="absolute  bottom-0 left-0  right-0 backdrop-blur-md bg-black/60 text-white p-4 rounded">
              <Link className="block text-center" to={`product/${product._id}`}>
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-sm">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
        {/* Scrollable buttons */}
        <button
          className={`absolute right-0 top-1/2 translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 ${
            isAtEnd ? "opacity-35 cursor-not-allowed" : ""
          }`}
          onClick={handleScrollRight}
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
