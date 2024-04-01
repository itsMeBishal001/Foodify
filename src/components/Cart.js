import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, updateItemQuantity } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../constents";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import emptyCart from "./images/empty-cart.jpg";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total amount when cartItems change
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
      <div className="flex flex-col items-center justify-center pt-20 h-[82.8vh]">
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
    <div className="flex flex-grow pt-20  items-center justify-center">
      <div className="w-2/3">
        <h1 className="font-bold text-3xl mb-5 flex items-center justify-center">
          <span className="mr-2">🛒</span> Cart Items
        </h1>
        <div className="mt-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-300 py-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={IMG_CDN_URL + item?.imageId}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    Price: ₹
                    {((item.price || item.defaultPrice) / 100).toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center  hover:scale-110"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <AiOutlineMinus className="text-xl" />
                    </button>

                    <span className="mx-2 text-lg font-semibold w-4 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 "
                      onClick={() => handleIncrement(item.id)}
                    >
                      <AiOutlinePlus className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-between">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded  hover:bg-red-600 my-4"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
          <h2 className="text-xl font-semibold mb-3">Price Details</h2>
          <div className="flex justify-between">
            <span className="text-gray-700">Total items:</span>
            <span className="text-gray-900">{cartItems?.length}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-gray-900">₹ {total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="bg-blue-500 text-white py-2 px-4 mb-1 rounded hover:bg-blue-600 text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
