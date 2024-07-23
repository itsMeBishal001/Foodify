import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const OrderConfirmation = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className={`order-confirmation flex flex-col items-center justify-center pt-20 px-4 ${isMobile ? 'px-2 pb-12' : ''}`}>
      <h1 className="text-3xl font-bold mb-5">Order Confirmation</h1>
      <div className={`confirmation-container bg-white rounded-lg shadow-md text-center p-4 ${isMobile ? 'max-w-sm' : isTablet ? 'max-w-md' : 'max-w-lg'}`}>
        <i className="fas fa-check-circle text-green-500 text-3xl mb-4"></i>
        <h2 className="text-xl font-semibold mb-4">Thank you for your order!</h2>
        <p className="text-gray-700 mb-4">Your order has been placed successfully.</p>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
