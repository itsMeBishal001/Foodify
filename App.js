import React from "react";
import ReactDOM from "react-dom";

const heading1 = <h1 className="title"> hello from h1</h1>;
const heading2 = <h2 className="title"> hello from h2</h2>;
const heading3 = <h3 className="title"> hello from h3</h3>;

const heading = (
  <div>
    {heading1}
    {heading2}
    {heading3}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
