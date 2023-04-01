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
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>
          <Link to="/about">
            {" "}
            <li>About</li>
          </Link>
          <li>Contact</li>
          <li>Cart</li>
          {isLogIn ? (
            <button onClick={() => setIsLogIn(false)}>Log In</button>
          ) : (
            <button onClick={() => setIsLogIn(true)}>Log Out</button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Heading;
