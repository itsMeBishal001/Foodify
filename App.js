import React from "react";
import ReactDOM from "react-dom/client";

//jsx expression to functional component

const Heading1 = () => {
  return (<h1 key ="1"className="title">hello from h1</h1>);
};
const Heading2 = () => {
  return (<h2 className="title">hello from h2</h2>);
};
const Heading3 = () => {
  return( <h3 className="title">hello from h3</h3>);
};


// component -> functional component && classbased compontnt
//functional component
const Heading = () => {
  return (
    <>
      <Heading1 />
      <Heading2 />
      <Heading3 />
      
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<Heading />);
