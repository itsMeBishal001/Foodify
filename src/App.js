import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Header";
import RestrudentCard from "./components/RestrudentCard";
import Footer from "./components/Footer";
import Body from "./components/Body";
import About from "./components/About";
import RestrudentMenu from "./components/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Shimmer from "./components/Shimmer";

import Instamart from "./components/Instamart";
// const About = lazy(() => import("./components/About"));
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
        element: <About />,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restrudentmenu/:id",
        element: <RestrudentMenu />,
      },
      {
        path: "/instamart",
        element: <Instamart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<RouterProvider router={appRouter} />);
