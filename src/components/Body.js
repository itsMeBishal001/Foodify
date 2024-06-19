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
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setIsFiltering(true);
    const filteredData = filterData(searchText, allRestaurants);
    setFilteredRestaurants(filteredData);
    setIsFiltering(false);
  }, [searchText]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(
        "https://foodfiy-server.onrender.com/api/restaurants?lat=22.51800&lng=88.38320&page_type=DESKTOP_WEB_LISTING"
      );
      // ("https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING");
      // if response is not ok then throw new Error
      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();
        console.log(json);
        // Initialize resData for Swiggy Restuarant data
        // initialize checkJsonData() function to check Swiggy Restaurant data
        async function checkJsonData(jsonData) {
          for (let i = 0; i < jsonData?.data?.cards.length; i++) {
            // initialize checkData for Swiggy Restaurant data
            let checkData =
              json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants;

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
          className="border border-gray-300 rounded-md py-2 px-5 mr-2 focus:outline-none w-80"
          type="text"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="items-center bg-orange-400 p-1 mx-4 rounded-md text-white hover:bg-orange-600 hover:shadow hover:shadow-green-500 transition ease-linear duration-200"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
          disabled={isFiltering}
        >
          {isFiltering ? "Filtering..." : "Search"}
        </button>
      </div>
      {isFiltering && <p>Filtering restaurants...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-6 gap-4 p-4 w-100">
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
