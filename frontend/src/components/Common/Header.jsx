import NavBar from "./NavBar";

const Header = () => {
  return (
    <header
      role="banner"
      className="border-b border-gray-700 shadow-md bg-[#14213D] text-gray-100 fixed top-0 w-full h-16 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
