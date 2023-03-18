import React from "react";
import ReactDOM from "react-dom/client";

//jsx expression to functional component

const Logo = () => {
  return (<h1 className="logo">A user icon</h1>);
};

const search=<input className="search" type="text" />;
 
const image=<img className="image" src="https://penji.co/wp-content/uploads/2022/08/5.-food-panda-logo.jpg"/>



// component -> functional component && classbased compontnt
//functional component
const Heading = () => {
  return (
    <div className="heading">
     {image}
     {search}
      <Logo />
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<Heading />);
