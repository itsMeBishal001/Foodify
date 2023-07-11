import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItems";
import { clearCart } from "../utils/cartSlice";
import { useState, useEffect } from "react";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total amount when cartItems change
    const newTotal = cartItems.reduce((acc, item) => acc + item.price/100, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-grow pt-20 justify-between">
      <div className="w-2/3">
        <h1 className="font-bold text-3xl">Cart Items </h1>
        <button
          className="bg-green-100 p-2 m-5"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
        <div className="mt-4">
          {cartItems.map((item) => (
            <FoodItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="w-1/3">
        <div className=" text-3xl">
          Price Details
          <div>total items - {cartItems.length}</div>
          <div>Total Amount ₹ {total}</div>
        </div>
        {/* Add your price details components or content here */}
      </div>
    </div>
  );
};

export default Cart;


