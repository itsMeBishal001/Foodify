// <!-- using js -->

//       //   const heading = document.getElementById("root");

//       const h1 = document.createElement("h1");
//       const node = document.createTextNode("hello with js");

//       h1.appendChild(node);
//       document.getElementById("root").appendChild(h1);
//       //   const h = document.createElement("h1");
//       //   heading.appendChild=(h);
//       //   heading.innerHTML = "<h1>hello with js</h1>";

//     <!-- using react -->
const heading = React.createElement("h1", {}, "hello with react");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
