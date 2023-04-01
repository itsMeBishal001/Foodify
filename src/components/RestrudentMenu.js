import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../constents";
import Shimmer from "./Shimmer";
import RestaurantItemCategory from "./RestaurantItemCategory";
import RestaurantNestedItemCategory from "./RestaurantNestedItemCategory.js";
const RestrudentMenu = () => {
  // how to read a dynamic URL params
  const { id } = useParams();
  // Use proper names
  const [restaurant, setRestauraunt] = useState(null);
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.5408357&lng=87.3406605&restaurantId=" +
        id
    );
    const json = await data.json();
    const jj =
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
        ?.card?.itemCards;
    const modifiedData = {
      info: json?.data?.cards[0]?.card?.card?.info,
      groupedCards: json?.data?.cards
        ?.find((o) => o?.groupedCard)
        .groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (o) => o?.card?.card?.itemCards || o?.card?.card?.categories
        )
    };

    // Optional Chaining
    setRestauraunt(modifiedData);
  }
  const restrudentInfos = restaurant?.info;
  //   const menu=restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards[0]?.card?.info?.name
  //   const menu=restaurantData
  // ?.find((obj) => obj.groupedCard)
  // ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
  //   (obj) => obj.card.card.itemCards || obj.card.card.categories
  // );
  const restaurantMenu = restaurant?.groupedCards;
  console.log(restaurantMenu);
  // console.log(restaurant)

  const itemCategory =
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
  const nestedItemCategory =
    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";
  console.log(restaurantMenu);
  return !restrudentInfos ? (
    <Shimmer />
  ) : (
    <>
      <div className="menu">
        <div className="restrudent_details">
          <h1>Restraunt id: {restrudentInfos?.id}</h1>
          <h2>{restrudentInfos?.name}</h2>
          <img  className="restrudent_img" src={url + restrudentInfos?.cloudinaryImageId} />
          <h3>{restrudentInfos?.areaName}</h3>
          <h3>{restrudentInfos?.city}</h3>
          <h3>{restrudentInfos?.avgRating} stars</h3>
          <h3>{restrudentInfos?.costForTwoMessage}</h3>
        </div>
        <div>
          <h1>Menu</h1>
          <ul>
            <div className="restaurant_menu">
              {Object.values(restaurantMenu)?.map((groupedCards, index) => (
                <div key={index}>
                  {groupedCards?.card?.card["@type"] === nestedItemCategory ||
                  itemCategory ? (
                    <div>
                      {groupedCards?.card?.card?.categories ? (
                        <RestaurantNestedItemCategory
                          {...groupedCards?.card?.card}
                        />
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
