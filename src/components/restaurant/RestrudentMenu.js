import React from "react";
import { useParams } from "react-router-dom";
import { ShimmerDish, ShimmerRestaurantInfo } from "../common/Shimmer.js";
import RestaurantItemCategory from "./RestaurantItemCategory.js";
import RestaurantNestedItemCategory from "./RestaurantNestedItemCategory.js";
import useGetRestaurantMenu from "../../hooks/useGetRestaurantMenu.js";
import RestaurantInfo from "./RestaurantInfo.js";

const RestrudentMenu = () => {
  const { id } = useParams();
  const { restaurantMenu, loading, error } = useGetRestaurantMenu(id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const restrudentInfos = restaurantMenu?.info;
  const groupedCards = restaurantMenu?.groupedCards;

  return (
    <div className="flex items-center flex-col">
      <div className="flex-grow pt-20 w-11/12 sm:w-11/12 md:w-10/12 lg:w-5/6 xl:w-3/5 2xl:w-1/2 ">
        {loading ? <ShimmerRestaurantInfo /> : <RestaurantInfo restrudentInfos={restrudentInfos} />}
        {loading ? Array(5).fill().map((_, index) => <ShimmerDish key={index} />) : <div>
          <h1 className="text-2xl">Menu</h1>
          <ul>
            <div className="restaurant_menu">
              {groupedCards?.map((groupedCard, index) => (
                <div key={index}>
                  {groupedCard?.card?.card["@type"] ===
                    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
                    groupedCard?.card?.card["@type"] ===
                    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ? (
                    <div className="">
                      {groupedCard?.card?.card?.categories ? (
                        <RestaurantNestedItemCategory
                          {...groupedCard?.card?.card}
                        />
                      ) : (
                        <RestaurantItemCategory
                          {...groupedCard?.card?.card}
                        />
                      )}
                    </div>
                  ) : (
                    <div>Fail</div>
                  )}
                </div>
              ))}
            </div>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default RestrudentMenu;
