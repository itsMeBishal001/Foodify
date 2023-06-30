import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../constents";
import Shimmer from "./Shimmer";
import RestaurantItemCategory from "./RestaurantItemCategory";
import RestaurantNestedItemCategory from "./RestaurantNestedItemCategory.js";
import useRestaurant from "../utils/useRestaurants";

const RestrudentMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestauraunt] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://cors-anywhere-axpo.onrender.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.5408357&lng=87.3406605&restaurantId=" +
        id
    );
    const json = await data.json();
    const modifiedData = {
      info: json?.data?.cards[0]?.card?.card?.info,
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

  return !restrudentInfos ? (
    <Shimmer />
  ) : (
    <>
      <div className="menu">
        <div className="restrudent_details">
          <h1 className="text-2xl">Restraunt id: {restrudentInfos?.id}</h1>
          <h2 className="text-xl">{restrudentInfos?.name}</h2>
          <img
            className="restrudent_img rounded-lg"
            src={url + restrudentInfos?.cloudinaryImageId}
            alt={restrudentInfos?.name}
          />
          <h3 className="text-lg">{restrudentInfos?.areaName}</h3>
          <h3 className="text-lg">{restrudentInfos?.city}</h3>
          <h3 className="text-lg">{restrudentInfos?.avgRating} stars</h3>
          <h3 className="text-lg">{restrudentInfos?.costForTwoMessage}</h3>
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
