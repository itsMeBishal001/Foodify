import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import RestrudentMenu from "./components/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";

// Lazy loading components
const About = lazy(() => import("./components/About"));
const Cart = lazy(() => import("./components/Cart"));
const Contact = lazy(() => import("./components/Contact"));
const LogIn = lazy(() => import("./components/LogIn"));
const Register = lazy(() => import("./components/Register"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <div className="applayout">
        <Heading />
        <Outlet />
        <Footer />
      </div>
    </Provider>
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
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LogIn />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
