import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/common/Header";
import Footer from "./components/common/Footer";
import Body from "./components/pages/Body";
import RestrudentMenu from "./components/restaurant/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

// Lazy loading components
const About = lazy(() => import("./components/pages/About"));
const Cart = lazy(() => import("./components/Cart"));
const Contact = lazy(() => import("./components/pages/Contact"));
const LogIn = lazy(() => import("./components/user/LogIn"));
const Register = lazy(() => import("./components/user/Register"));
const Profile = lazy(() => import ('./components/user/Profile'));

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
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
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
