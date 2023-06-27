import { useEffect, useState } from "react";
const useRestaurant=(id)=>{
    const [restaurant,setRestauraunt]=useState(null);
    useEffect(() => {
        getRestaurantInfo();
      }, []);
    
      async function getRestaurantInfo() {
        const data = await fetch(
          "https://cors-anywhere-axpo.onrender.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.5408357&lng=87.3406605&restaurantId=" +
            id
            //
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
      return restaurant;
}
export default useRestaurant;