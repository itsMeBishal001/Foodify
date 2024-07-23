import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useSelector, useDispatch } from "react-redux";
import Heading from "./components/common/Header";
import Footer from "./components/common/Footer";
import Body from "./components/pages/Body";
import RestrudentMenu from "./components/restaurant/RestrudentMenu";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { selectLoading, listenForAuthChanges } from "./store/userSlice";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/common/Loader";

// Lazy loading components
const About = lazy(() => import("./components/pages/About"));
const Cart = lazy(() => import("./components/Cart"));
const Contact = lazy(() => import("./components/pages/Contact"));
const LogIn = lazy(() => import("./components/user/LogIn"));
const Register = lazy(() => import("./components/user/Register"));
const Profile = lazy(() => import('./components/user/Profile'));
const Checkout = lazy(() => import('./components/Checkout'));
const OrderConfirmation = lazy(() => import('./components/OrderConfirmation'));

const AppLayout = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="applayout">
      <Heading />
      <Outlet />
      <Footer />
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
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "/order-confirmation",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderConfirmation />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <LogIn />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restrudentmenu/:id",
        element: (
          <PrivateRoute>
            <RestrudentMenu />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
