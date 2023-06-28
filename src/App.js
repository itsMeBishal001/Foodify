import React ,{Suspense, lazy}from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Header";
import RestrudentCard from "./components/RestrudentCard";
import Footer from "./components/Footer";
import Body from "./components/Body";
// import About from "./components/About";
// import Cart from "./components/Cart";
// import Contact from "./components/Contact";
import RestrudentMenu from "./components/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Shimmer from "./components/Shimmer";

const About = lazy(() => import("./components/About"));
const Cart=lazy(()=>import("./components/Cart"));
const Contact=lazy(()=>import("./components/Contact"));
// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy Loading
// On Demand Loading
// Dynamic Import

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
      {<Outlet />}

      {/* {<Body />} */}
      {<Footer />}
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/about",
        element:  <Suspense><About /></Suspense>,
      },
      {
        path: "/cart",
        element:  <Suspense><Cart/></Suspense>,
      },
      {
        path: "/contact",
        element:  <Suspense><Contact/></Suspense>,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restrudentmenu/:id",
        element: <RestrudentMenu />,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<RouterProvider router={appRouter} />);
