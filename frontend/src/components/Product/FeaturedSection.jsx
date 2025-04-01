import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturedSection = () => {
  const features = [
    {
      featureIcon: <HiShoppingBag className="text-pink-500" />,
      title: "Free International Shipping",
      description: "On all orders over $100.00",
    },
    {
      featureIcon: <HiArrowPathRoundedSquare className="text-green-500" />,
      title: "45-Day Return Policy",
      description: "Money-back guarantee",
    },
    {
      featureIcon: <HiOutlineCreditCard className="text-blue-500" />,
      title: "Secure Checkout",
      description: "100% secure checkout process",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map(({ featureIcon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="p-4 rounded-full text-4xl bg-gray-200 mb-4">
              {featureIcon}
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {title}
            </h4>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
