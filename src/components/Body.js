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
    const data = await fetch(
      "https://cors-anywhere-axpo.onrender.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.3192377&lng=84.7921049&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
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
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRestaurants.length === 0 ? (
          <h1 className="text-center">No Restaurants match your filter!</h1>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={"/restrudentmenu/" + restaurant.data.id}
              key={restaurant.data.id}
              className="carousel-item focus:outline-none hover:bg-gray-100 rounded-lg p-4"
            >
              <RestrudentCard {...restaurant.data} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
