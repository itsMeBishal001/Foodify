import React, { useState, useRef, useEffect } from "react";
import { CDN_IMG_URL_RES } from "../../utils/config";
import { addItem, syncCartWithFirebase } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCartPlus, FaArrowRight } from "react-icons/fa";

// Image Component
const DishImage = ({ imageId, name }) => (
  imageId ? (
    <img
      className="dish-image object-cover h-32 w-32 rounded-xl"
      src={CDN_IMG_URL_RES + imageId}
      alt={name}
    />
  ) : (
    <div className="dish-image-placeholder flex items-center justify-center h-32 w-32 rounded-xl bg-gray-light">
      <span className="text-gray-600 font-bold text-center">{name}</span>
    </div>
  )
);

// Button Component
const ActionButton = ({ existingItem, addFoodItem, goToCart }) => (
  existingItem ? (
    <div className="relative group">
      <button
        className="bg-secondary text-white font-bold px-4 py-2 rounded mt-2 w-28 h-9 absolute -bottom-5 left-1/2 transform -translate-x-1/2 hover:bg-[#e58218] flex items-center justify-center"
        onClick={goToCart}
      >
        <FaShoppingCart className="mr-2" />
        <FaArrowRight className="ml-2" />
      </button>
      <span className="tooltip-text bg-gray-700 text-white text-xs rounded-lg p-1 absolute left-1/2 transform -translate-x-1/2 bottom-10 opacity-0 group-hover:opacity-100">
        View Cart
      </span>
    </div>
  ) : (
    <button
      className="bg-primary text-white font-bold px-4 py-2 rounded mt-2 w-28 h-9 absolute -bottom-5 left-1/2 transform -translate-x-1/2 hover:bg-[#239a54] flex items-center justify-center"
      onClick={addFoodItem}
    >
      <FaCartPlus className="mr-2" /> Add
    </button>
  )
);

// Main RestaurantDish Component
const RestaurantDish = (dish) => {
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);
  const user = auth.currentUser; // Get the current user
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const navigate = useNavigate();

  const addFoodItem = (item) => {
    const existingItem = cartItems.find((e) => e.id === item.id);
    const updatedItem = existingItem
      ? { ...existingItem, quantity: existingItem.quantity + 1 }
      : { ...item, quantity: 1 };
    const updatedCartItems = existingItem
      ? cartItems.map((cartItem) => (cartItem.id === item.id ? updatedItem : cartItem))
      : [...cartItems, updatedItem];

    dispatch(addItem(updatedItem));

    if (user) {
      dispatch(syncCartWithFirebase(user.uid, updatedCartItems)); // Sync with Firebase
    } else {
      console.warn("User not logged in. Cart will not be synced to Firebase.");
    }
  };

  const goToCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  const toggleDescription = () => {
    setShowFullDescription(true);
  };

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      setIsOverflowing(descriptionElement.scrollHeight > descriptionElement.clientHeight);
    }
  }, [dish.description]);

  const existingItem = cartItems.find((e) => e.id === dish.id);

  return (
    <div className="dish-container flex items-center justify-between bg-white p-5 border-b border-gray-300">
      <div className="dish-details flex-grow mr-4">
        <h3 className="dish-subheader text-lg font-bold text-black font-display">{dish.name}</h3>
        <h2 className="text-xl font-semibold text-black font-display">
          ₹{dish.price ? dish.price / 100 : dish.defaultPrice / 100}
        </h2>
        <div className="dish-description-container relative">
          <p
            ref={descriptionRef}
            className={`dish-description text-black font-sans ${showFullDescription ? "" : "line-clamp-2"}`}
          >
            {dish.description}
            {!showFullDescription && isOverflowing && (
              <span
                className="text-info cursor-pointer absolute bottom-0 right-0 bg-white px-1"
                onClick={toggleDescription}
              >
                ...more
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="relative flex items-center flex-shrink-0 mb-3">
        <div className="relative">
          <DishImage imageId={dish.imageId} name={dish.name} />
          <ActionButton existingItem={existingItem} addFoodItem={() => addFoodItem(dish)} goToCart={goToCart} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDish;
