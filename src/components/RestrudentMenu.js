import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantItemCategory from "./RestaurantItemCategory";
import RestaurantNestedItemCategory from "./RestaurantNestedItemCategory.js";
import useGetRestaurantMenu from "../utils/useGetRestaurantMenu"; // Adjusted import name
import { CDN_IMG_URL_RES } from "../config.js";

const RestrudentMenu = () => {
  const { id } = useParams();
  const { restaurantMenu, loading, error } = useGetRestaurantMenu(id); // Use custom hook

  if (loading) {
    return <Shimmer />; // Show shimmer or loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle error state if fetch fails
  }

  const restrudentInfos = restaurantMenu?.info;
  const groupedCards = restaurantMenu?.groupedCards;

  return (
    <div className="flex items-center flex-col">
      <div className=" flex-grow pt-20 w-1/2">
        <div className="restrudent_details flex">
          <div className="flex-2 m-5">
            <h2 className="text-xl font-bold font-sans">
              {restrudentInfos?.name}
            </h2>
            <h1 className="text-2xl">Restaurant id: {restrudentInfos?.id}</h1>
            <img
              className="restrudent_img rounded-lg h-40 my-2"
              src={CDN_IMG_URL_RES + restrudentInfos?.cloudinaryImageId}
              alt={restrudentInfos?.name}
            />
          </div>
          <div className="flex  items-end space-x-3 p-5">
            <h3 className="text-lg ">{restrudentInfos?.areaName}</h3>
            <h3 className="text-lg">{restrudentInfos?.city}</h3>
            <h3 className="text-lg font-medium">
              {restrudentInfos?.avgRating}{" "}
              <span className="icon-star text-yellow-500">★</span>
            </h3>

            <h3 className="text-lg font-medium">
              {restrudentInfos?.costForTwoMessage}
            </h3>
          </div>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
};

export default RestrudentMenu;
