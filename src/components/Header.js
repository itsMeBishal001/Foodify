import logoI from "../components/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const logo = <img className="image" src={logoI} alt="Logo" />;

const Heading = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <div className="flex items-center space-x-10 justify-between">
      <img
        className="w-20 h-20 object-contain"
        src={logoI}
        alt="Logo"
      />
     <div>
        <ul className="flex space-x-5">
          <li>
            <Link
              to="/"
              className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
        onClick={() => setIsLogIn(!isLogIn)}
      >
        {isLogIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};

export default Heading;
