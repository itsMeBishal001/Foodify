import React, { useState, useEffect, useRef, useCallback } from "react";
import RestrudentCard from "./RestrudentCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useGetRestaurants from "../utils/useGetRestaurants";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const [
    resultsFound,
    restaurantList,
    setRestaurantList,
    filteredRestList,
    setFilteredRestList,
    errMsg,
    setOffset,
    loading,
    setLoading,
    hasMore,
    loadingForMoreRes
  ] = useGetRestaurants();
  const observer = useRef();

  const lastRestaurant = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset((prevOffset) => prevOffset + 31);
      }
    });

    if (node) observer.current.observe(node);
  }, [loadingForMoreRes, hasMore, setOffset]);

  const filterRestaurant = () => {
    if (restaurantList.length > 0) {
      setLoading(true);
      const data = filterData(searchText, restaurantList);
      setFilteredRestList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText?.length >= 0) {
        filterRestaurant();
        window.scrollTo(0, 0);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  if (!restaurantList) return null;

  return true ? (
    <Shimmer count={16} />
  ) : (
    <div className="flex-grow pt-20">
      <div className="flex items-center justify-center py-4 m-1">
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
            filterRestaurant();
          }}
          disabled={isFiltering}
        >
          {isFiltering ? "Filtering..." : "Search"}
        </button>
      </div>
      {isFiltering && <p>Filtering restaurants...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 w-100">
        {filteredRestList.length === 0 ? (
          <h1 className="text-center">No Restaurants match your filter!</h1>
        ) : (
          <>
            {filteredRestList.map((restaurant, index) => (
              <Link
                ref={index === filteredRestList.length - 1 ? lastRestaurant : null}
                to={"/restrudentmenu/" + restaurant?.info.id}
                key={restaurant?.info.id + "_" + index}
                className="carousel-item focus:outline-none hover:bg-gray-100 rounded-lg p-6"
              >
                <RestrudentCard {...restaurant.info} />
              </Link>
            ))}
            {loadingForMoreRes && <p>Loading more restaurants...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
