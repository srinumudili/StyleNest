import { Link } from "react-router-dom";
import featuredImg from "../../assets/featuredCollection.png";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl shadow-md">
        {/* Left Section */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Comfort & Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Made for Life, Styled for You
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Experience premium, comfortable clothing that seamlessly combines
            fashion and function—crafted to help you look and feel your best
            every day.
          </p>
          <Link
            to="/collection/all"
            className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-700 transition-all duration-300 ease-in-out text-white rounded-lg text-lg shadow-md"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          <img
            src={featuredImg}
            alt="Featured Collection"
            className="w-full h-auto object-cover rounded-tr-3xl rounded-br-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
