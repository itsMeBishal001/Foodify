import React from "react";
import ReactDOM from "react-dom/client";

/*
 * App layout --
 *  header -
 *    logo
 *    home about cart
 *  body -
 *     search
 *     restrudnt list-
 *         restrudent card 
 *            image rating name cuisins
 *  footer  
 */

const logo = (
  <img
    className="image"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLki7JKI12Q_QEUwR0qtnPoi3oboOMI4xCA&usqp=CAU"
  />
);

// component -> functional component && classbased compontnt
//functional component

const Heading = () => {
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
        </ul>
      </div>
      
    </div>
  );
};
const RestrudentCard=()=>{
  return(
    <div className="restrurdentCard">
    <img className ="cardImg"src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/iflof6e8fmd9nwmwg0nf"
    />
    <h3>Birini By Kilo</h3>
    <h4>Biryani, Hyderabadi</h4>
    <h4>Durgapur Locality 6.0 km</h4>

    </div>
  );
};
const Body = () => {
  return (
    <div className="body">
      
      {<RestrudentCard/>}
      
    </div>
  );
};
const Footer = () => {
  return (
    <div className="footer">
      footer
      
    </div>
  );
};
const AppLayout = () => {
  return (
    <div className="applayout">
       {<Heading/>}
       {<Body/>}
       {<Footer/>}
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<AppLayout />);
