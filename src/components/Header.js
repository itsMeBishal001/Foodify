import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import cartImage from "../components/images/shopping-cart-icon.png";
import logoI from "../components/images/logo.png";

const navigationItems = [
  { to: "/", text: "Home" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" },
  { to: "/login", text: "Login" },
];

const NavigationItem = ({ to, text, onClick, className }) => {
  return (
    <li onClick={onClick}>
      <Link to={to} className={className || "block py-2"}>
        {text}
      </Link>
    </li>
  );
};

const Heading = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".drawer-menu") && isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <div className="bg-gray-100" onClick={handleOutsideClick}>
      <div className="fixed top-0 left-0 right-0 bg-gray-100 flex items-center space-x-10 justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-20 h-20" src={logoI} alt="Logo" />
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-800" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-5">
            {navigationItems.map((item, index) => (
              <NavigationItem
                key={index}
                to={item.to}
                text={item.text}
                className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              />
            ))}
            <li>
              <Link
                to="/cart"
                className="flex bg-amber-200 hover:text-blue-500 rounded-md text-sm font-medium transition-colors duration-300"
              >
                <img
                  className="w-7 h-8 object-contain"
                  src={cartImage}
                  alt="cart"
                />
                <span className="ml-1 text-red-400">{cartItems.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 bottom-0 bg-gray-800 text-white py-4 px-2 w-52 flex flex-col justify-center items-center z-50 drawer-menu">
          <ul className="py-4 text-center">
            {navigationItems.map((item, index) => (
              <NavigationItem
                key={index}
                to={item.to}
                text={item.text}
                onClick={toggleMenu}
                className="text-gray-300 hover:text-blue-500 block py-2"
              />
            ))}
            <li>
              <Link to="/cart" className="block py-2" onClick={toggleMenu}>
                <img
                  className="w-7 h-8 inline-block"
                  src={cartImage}
                  alt="cart"
                />
                <span className="ml-1">{cartItems.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Heading;
