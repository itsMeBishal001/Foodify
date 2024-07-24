import { useState, useRef, useEffect } from "react";
import { CDN_IMG_URL_RES } from "../../utils/config";
import { addItem, syncCartWithFirebase } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase"

const RestaurantDish = (dish) => {
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);
  const user = auth.currentUser; // Get the current user
// console.log(user)
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  const addFoodItem = (item) => {
    const itemWithQuantity = { ...item, quantity: 1 };
    dispatch(addItem(itemWithQuantity));
  
    if (user) {
      console.log("User ID:", user.uid);
      const updatedCartItems = [...cartItems, itemWithQuantity];
      dispatch(syncCartWithFirebase(user.uid, updatedCartItems)); // Sync with Firebase
    } else {
      console.warn("User not logged in. Cart will not be synced to Firebase.");
    }
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

  return (
    <div className="dish-container flex items-center justify-between bg-gray-50 p-5 border-b border-gray-400">
      <div className="dish-details flex-grow mr-4">
        <h3 className="dish-subheader text-lg font-bold">{dish.name}</h3>
        <h2 className="text-xl font-semibold">
          ₹{dish.price ? dish.price / 100 : dish.defaultPrice / 100}
        </h2>
        <div className="dish-description-container relative">
          <p
            ref={descriptionRef}
            className={`dish-description text-gray-600 ${showFullDescription ? '' : 'line-clamp-2'}`}
          >
            {dish.description}
            {!showFullDescription && isOverflowing && (
              <span
                className="text-blue-600 cursor-pointer absolute bottom-0 right-0 bg-white px-1"
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
          {dish.imageId ? (
            <img
              className="dish-image object-cover h-32 w-32 rounded-xl"
              src={CDN_IMG_URL_RES + dish.imageId}
              alt={dish.name}
            />
          ) : (
            <div className="dish-image-placeholder flex items-center justify-center h-32 w-32 rounded-xl bg-gray-200">
              <span className="text-gray-600 font-bold text-center">{dish.name}</span>
            </div>
          )}
          <button
            className="bg-white text-green-700 font-bold px-4 py-2 rounded mt-2 w-24 absolute -bottom-5 left-1/2 transform -translate-x-1/2"
            onClick={() => addFoodItem(dish)}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDish;
