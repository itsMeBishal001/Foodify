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
    return <div className="p-4 text-error font-sans">Error: {error}</div>;
  }

  const restrudentInfos = restaurantMenu?.info;
  const groupedCards = restaurantMenu?.groupedCards;

  return (
    <div className="flex items-center flex-col font-sans">
      <div className="flex-grow pt-20 w-11/12 sm:w-11/12 md:w-10/12 lg:w-5/6 xl:w-3/5 2xl:w-1/2">
        {loading ? (
          <ShimmerRestaurantInfo />
        ) : (
          <RestaurantInfo restrudentInfos={restrudentInfos} />
        )}
        {loading ? (
          Array(5)
            .fill()
            .map((_, index) => <ShimmerDish key={index} />)
        ) : (
          <div>
            <h1 className="text-2xl font-display text-primary mb-4">Menu</h1>
            <ul className="space-y-4">
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
                      <div className="text-error">Fail</div>
                    )}
                  </div>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestrudentMenu;
