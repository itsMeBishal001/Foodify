import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, updateItemQuantity } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../constents";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total amount when cartItems change
    const newTotal = cartItems.reduce(
      (acc, item) => acc + (item?.price * item?.quantity) / 100,
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
    console.log({ id, quantity });
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleIncrement = (id) => {
    const itemToUpdate = cartItems.find((item) => item.id === id);
    console.log(itemToUpdate);
    if (itemToUpdate && itemToUpdate.quantity < 10) {
      console.log("id");
      handleQuantityChange(id, itemToUpdate.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      handleQuantityChange(id, itemToUpdate.quantity - 1);
    }
  };

  return (
    <div className="flex flex-grow pt-20 justify-between">
      <div className="w-2/3">
        <h1 className="font-bold text-3xl mb-5">Cart Items</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">
            Your cart is empty. <Link to="/">Browse</Link> our menu to add
            items.
          </p>
        ) : (
          <>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-5"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
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
                      <p>Price: ₹{(item.price / 100).toFixed(2)}</p>
                      <div className="flex items-center">
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          min="1"
                          max="10" // You can set a maximum quantity if needed
                        />
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
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
          </>
        )}
      </div>

      <div className="w-1/3">
        <div className="text-3xl mb-5">
          Price Details
          <div className="text-gray-700 mt-2">
            Total items:{" "}
            {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
          <div className="text-gray-700">
            Total Amount: ₹ {total.toFixed(2)}
          </div>
        </div>
        <Link
          to="/checkout"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
