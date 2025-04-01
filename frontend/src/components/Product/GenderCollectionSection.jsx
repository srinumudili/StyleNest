import WomenCollectionImg from "../../assets/womenCollection.jpg";
import MenCollectionImg from "../../assets/menCollection.jpg";
import { Link } from "react-router-dom";

const collections = [
  {
    img: WomenCollectionImg,
    alt: "Women's Fashion Collection",
    title: "Women’s Collection",
    link: "/collection/all?gender=Women",
  },
  {
    img: MenCollectionImg,
    alt: "Men's Fashion Collection",
    title: "Men’s Collection",
    link: "/collection/all?gender=Men",
  },
];

const GenderCollectionSection = () => {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map(({ img, alt, title, link }, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={img}
              alt={alt}
              className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-lg p-5 shadow-md text-center">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <Link
                to={link}
                className="mt-2 inline-block text-lg font-medium text-gray-600 hover:text-black transition-all duration-200"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollectionSection;
