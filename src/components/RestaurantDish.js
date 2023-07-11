import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
const RestaurantDish = (dish) => {
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <>
      <div className="dish_Container bg-white rounded-lg shadow-md p-4">
        <div className="dish_Details">
          <h3 className="dish_SubHeader text-lg font-bold">{dish.name}</h3>
          <h2 className="text-xl font-semibold">
            {dish.price ? dish.price / 100 : dish.defaultPrice / 100}
          </h2>
          <p className="dish_Description text-gray-600">{dish.description}</p>
        </div>

        <button className="p-1 bg-green-50" onClick={() => addFoodItem(dish)}>
          Add
        </button>
        <div className="dish_ImageContainer">
          {dish.imageId ? (
            <img
              className="dish_Image object-cover h-32 w-32 rounded"
              src={
                "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                dish.imageId
              }
              alt={dish.name}
            />
          ) : (
            <div className="text-gray-400">No Image Available</div>
          )}
        </div>
      </div>
      <div className="divider border-t border-gray-300 my-4"></div>
    </>
  );
};

export default RestaurantDish;
