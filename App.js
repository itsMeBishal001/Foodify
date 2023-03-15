import React from "react";
import ReactDOM from "react-dom";


const heading1 = React.createElement("h1", {className:"title"}, "hello from h1");
const heading2 = React.createElement("h2", {className:"title"}, "hello from h2");
const heading3 = React.createElement("h3", {className:"title"}, "hello from h3");
const heading = React.createElement("div", {}, [heading1,heading2,heading3]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
