import React from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Header";
import RestrudentCard from "./components/RestrudentCard";
import Footer from "./components/Footer";
import Body from "./components/Body";
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





const AppLayout = () => {
  return (
    <div className="applayout">
      {<Heading />}
      {<Body />}
      {<Footer />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<AppLayout />);
