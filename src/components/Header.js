import logoI from "../components/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import cartImage from "../components/images/shopping-cart-icon.png"
// import LogIn from "../components/LogIn.js";

const logo = <img className="w-20 md:w-32 object-contain" src={logoI} alt="Logo" />;

const Heading = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-100 flex items-center space-x-10 justify-between">
      <img className="w-20 h-20 object-contain" src={logoI} alt="Logo" />
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
              to="/contact"
              className="text-black-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link
              to="/cart"
              className=" flex  bg-amber-200 hover:text-blue-500  rounded-md text-sm font-medium transition-colors duration-300"
            ><img className="w-7 h-8 object-contain" src={cartImage} alt="cart" />
              <div className="text-red-400 ">{cartItems.length}</div>


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
