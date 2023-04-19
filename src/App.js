import React , { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Header";
import RestrudentCard from "./components/RestrudentCard";
import Footer from "./components/Footer";
import Body from "./components/Body";
// import About from "./components/About";
import RestrudentMenu from "./components/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet} from "react-router-dom";

import Shimmer from "./components/Shimmer";

const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));
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
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// can call  a functional component ==> <component/> && component()-- because it is a function
root.render(<RouterProvider router={appRouter} />);
