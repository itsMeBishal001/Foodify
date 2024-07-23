import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, updateItemQuantity } from "../store/cartSlice";
import emptyCart from "../assets/images/empty-cart.jpg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CDN_IMG_URL_RES } from "../utils/config";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) =>
        acc + ((item?.price || item?.defaultPrice) * item?.quantity) / 100,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleIncrement = (id) => {
    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity < 10) {
      handleQuantityChange(id, itemToUpdate.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      handleQuantityChange(id, itemToUpdate.quantity - 1);
    }
  };

  if (cartItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 min-h-[82.8vh] px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          It seems like you haven't added any items to your cart yet. <br />
          <Link to="/" className="text-blue-500 hover:underline">
            Browse our products
          </Link>{" "}
          to start shopping!
        </p>
        <img src={emptyCart} alt="Empty Cart" className="w-64 h-64" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row pt-20 items-center justify-center px-4">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h1 className="font-bold text-3xl mb-5 flex items-center justify-center">
          <span className="mr-2">🛒</span> Cart Items
        </h1>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-4"
            >
              <div className="flex items-center space-x-4 w-full md:w-2/3">
                <img
                  src={`${CDN_IMG_URL_RES +item?.imageId}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-center md:text-left">{item.name}</h3>
                  <p className="text-center md:text-left">
                    Price: ₹{((item.price || item.defaultPrice) / 100).toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center md:justify-start mt-2">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center hover:scale-110"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <AiOutlineMinus className="text-xl" />
                    </button>
                    <span className="mx-2 text-lg font-semibold w-4 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <AiOutlinePlus className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 mt-2 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 my-4 w-full"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 md:ml-8 mt-8 md:mt-0">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
          <h2 className="text-xl font-semibold mb-3 text-center md:text-left">
            Price Details
          </h2>
          <div className="flex justify-between">
            <span className="text-gray-700">Total items:</span>
            <span className="text-gray-900">{cartItems.length}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-gray-900">₹{total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center w-full block"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
