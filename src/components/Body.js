import { useState, useEffect } from "react";
import { restrudentList } from "../constents";
import RestrudentCard from "./RestrudentCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    // const data = await fetch(
    //   // "https://cors-anywhere-axpo.onrender.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING"
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING"
    // );
    // const json = await data.json();

    // // setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    // setAllRestaurants(
    //   json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // // setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    // setFilteredRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
     // handle the error using try... catch
    try {
      const response = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING");
      // if response is not ok then throw new Error
      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();

        // Initialize resData for Swiggy Restuarant data
       // const resData = json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        // initialize checkJsonData() function to check Swiggy Restaurant data
        async function checkJsonData(jsonData) {
          for (let i = 0; i < jsonData?.data?.cards.length; i++) {

      
            // initialize checkData for Swiggy Restaurant data
            let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            // if checkData is not undefined then return it
            if (checkData !== undefined) {
              return checkData;
            }
          }
        }

        // call the checkJsonData() function which return Swiggy Restaurant data
        const resData = await checkJsonData(json);

        // update the state variable restaurants with Swiggy API data
        setAllRestaurants(resData);
        setFilteredRestaurants(resData);
      }
    } catch (error) {
      console.error(error); // show error in console
    }
  }
  

  if (!allRestaurants) return null;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex-grow pt-20">
      <div className="flex  items-center justify-center py-4 m-1">
        <input
          className="border border-gray-300 rounded-md py-2 px-5 mr-2 focus:outline-none"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit" className="items-center bg-orange-400 p-1 mx-4 rounded-md text-white hover:bg-orange-600 hover:shadow hover:shadow-green-500 transition ease-linear duration-200"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 w-100">
        {filteredRestaurants.length === 0 ? (
          <h1 className="text-center">No Restaurants match your filter!</h1>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={"/restrudentmenu/" + restaurant?.info.id}
              key={restaurant?.info.id}
              className="carousel-item focus:outline-none hover:bg-gray-100 rounded-lg p-6"
            >
              <RestrudentCard {...restaurant.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
