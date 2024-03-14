import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../constents";
import Shimmer from "./Shimmer";
import RestaurantItemCategory from "./RestaurantItemCategory";
import RestaurantNestedItemCategory from "./RestaurantNestedItemCategory.js";
import useRestaurant from "../utils/useRestaurants";
// import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const RestrudentMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestauraunt] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.5408357&lng=87.3406605&restaurantId=" +
        id
    );
    const json = await data.json();
    const modifiedData = {
      info: json?.data?.cards[2]?.card?.card?.info,
      groupedCards: json?.data?.cards
        ?.find((o) => o?.groupedCard)
        .groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (o) => o?.card?.card?.itemCards || o?.card?.card?.categories
        )
    };

    setRestauraunt(modifiedData);
  }

  const restrudentInfos = restaurant?.info;
  const restaurantMenu = restaurant?.groupedCards;


  //add item
  const dispatch=useDispatch();
  const addFoodItem=(item)=>{
    dispatch(addItem(item));
  }
  return !restrudentInfos ? (
    <Shimmer />
  ) : (
    <>
      <div className=" flex-grow pt-20 ">
      <div className="restrudent_details flex">
  <div className="flex-2 m-5">
    <h2 className="text-xl font-bold font-sans">{restrudentInfos?.name}</h2>
    <h1 className="text-2xl">Restaurant id: {restrudentInfos?.id}</h1>
    <img
      className="restrudent_img rounded-lg h-40 my-2"
      src={url + restrudentInfos?.cloudinaryImageId}
      alt={restrudentInfos?.name}
    />
  </div>
  <div className="flex  items-end space-x-3 p-5">
  <h3 className="text-lg ">{restrudentInfos?.areaName}</h3>
  <h3 className="text-lg">{restrudentInfos?.city}</h3>
  <h3 className="text-lg font-medium">{restrudentInfos?.avgRating} <span className="icon-star text-yellow-500">★</span></h3>
  
  <h3 className="text-lg font-medium">{restrudentInfos?.costForTwoMessage}</h3>
</div>

</div>

        <div>
          <h1 className="text-2xl">Menu</h1>
          <ul>
            <div className="restaurant_menu">
              {Object.values(restaurantMenu)?.map((groupedCards, index) => (
                <div key={index}>
                  {groupedCards?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
                  groupedCards?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ? (
                    <div>
                      {groupedCards?.card?.card?.categories ? (
                        <RestaurantNestedItemCategory {...groupedCards?.card?.card} />
                      ) : (
                        <RestaurantItemCategory {...groupedCards?.card?.card} />
                      )}
                    </div>
                  ) : (
                    <div>Fail</div>
                  )}
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RestrudentMenu;
