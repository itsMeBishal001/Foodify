import logoI from "../components/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";


const logo = <img className="image" href="" src={logoI} />;

// component -> functional component && classbased compontnt
//functional component

const Heading = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  
  return (
    <div className="heading">
      {
        // writing comments on jsx =>i can make comments within {} .. as here is js section
      }
      {logo}
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li> <Link to="/about">
            About
          </Link></li>
          {/* <li>Contact</li> */}
          <li> <Link to="/cart">
            Cart
          </Link></li>
          <li> <Link to="/contact">
            Contact
          </Link></li>
          {/* <li>Cart</li> */}
          
        </ul>
      </div>
      {/* <h5>{isOnline ? "isOnline ==>🟢" : "sOnline ==>🔴"}</h5> */}
      {isLogIn ? (
        <button onClick={() => setIsLogIn(false)}>Log In</button>
      ) : (
        <button onClick={() => setIsLogIn(true)}>Log Out</button>
      )}
    </div>
  );
};

export default Heading;
