import logoI from "../components/images/logo.png";
import { useState } from "react";
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
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          {isLogIn ? (
        <button onClick={() => setIsLogIn(false)}>Log In</button>
      ) : (
        <button onClick={()=>setIsLogIn(true)}>Log Out</button>
      )}
        </ul>
        
      </div>
     
    </div>
  );
};

export default Heading;
