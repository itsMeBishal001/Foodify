import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Checkout = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + ((item?.price || item?.defaultPrice) * item?.quantity) / 100,
    0
  );

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className={`checkout flex flex-col items-center justify-center pt-20 px-4 ${isMobile ? 'px-2 pb-12' : ''}`}>
      <h1 className="text-3xl font-bold mb-5">Checkout</h1>
      <div className={`checkout-container flex flex-col bg-white p-4 rounded-lg shadow-lg ${isMobile ? 'max-w-sm' : isTablet ? 'max-w-md' : 'max-w-lg'} h-full`}>
        <div className="flex flex-col flex-grow overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className={`space-y-4 overflow-y-auto ${isMobile ? 'max-h-48' : 'max-h-60'} mb-4`}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-300 py-2"
                >
                  <span>{item.name}</span>
                  <span>₹{((item.price || item.defaultPrice) / 100).toFixed(2)}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <Link
              to="/order-confirmation"
              className="bg-green-500 text-white py-2 px-4 rounded block text-center hover:bg-green-600"
            >
              Place Order
            </Link>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            <p className="mb-4">Your cart is empty. Go to the home page to add products or foods.</p>
            <Link
              to="/"
              className="bg-blue-500 text-white py-2 px-4 rounded block text-center hover:bg-blue-600"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
