import React from "react";
import ReactDOM from "react-dom";

//jsx expression
//internally jsx doing the React.createElement and returning an object
const heading1 = <h1 className="title"> hello from h1</h1>;
const heading2 = <h2 className="title"> hello from h2</h2>;
const heading3 = <h3 className="title"> hello from h3</h3>;

// component -> functional component && classbased compontnt
//functional component
const Heading = () => {
  return (
    /* in this return i have to return only one tag --if we don't want to show 
     any extra tag on the inspect page then use React.Fragment 
     */
    <>
      {heading1}
      {heading2}
      {heading3}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<Heading />);
