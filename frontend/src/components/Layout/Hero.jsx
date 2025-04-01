import { Link } from "react-router-dom";
import heroImg from "../../assets/styleNestHero.avif";

const Hero = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[900px]">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="StyleNest Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl text-left">
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight uppercase mb-4 text-white drop-shadow-lg">
            Style Meets Comfort
          </h1>
          <p className="mt-2 mb-6 text-lg md:text-xl text-gray-200 max-w-lg">
            Discover the latest trends and refresh your wardrobe with
            fashion-forward styles.
          </p>

          {/* CTA Button */}
          <Link
            to="/collection/all"
            className="px-6 py-3 bg-[#E63946] text-lg font-semibold rounded-lg shadow-md 
             transition-all duration-300 hover:bg-[#C02739] text-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
