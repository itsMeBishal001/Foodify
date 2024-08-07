import React, { useState, useEffect, useRef, useCallback } from "react";
import RestrudentCard from "../restaurant/RestrudentCard";
import Shimmer, { ShimmerRestrudentCard } from "../common/Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../../utils/helper";
import useGetRestaurants from "../../hooks/useGetRestaurants";
import FilterOptions from "../FilterOptions";
import { useMediaQuery } from 'react-responsive';
import CategoryCarousel from "../CategoryCarousel";
import { selectUserData } from '../../store/userSlice';
import { useSelector } from "react-redux";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const userData = useSelector(selectUserData);

  const {
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
    loadingForMoreRes,
    foodType
  } = useGetRestaurants();

  const observer = useRef();

  const lastRestaurant = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset((prevOffset) => prevOffset + 31);
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore, setOffset]);

  const filterRestaurant = () => {
    if (searchText.length === 0 && activeFilters.length === 0) {
      setFilteredRestList(restaurantList);
    } else if (restaurantList.length > 0) {
      setLoading(true);
      const data = filterData(searchText, restaurantList, activeFilters);
      setFilteredRestList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText.length > 0 || activeFilters.length > 0) {
      const timeoutId = setTimeout(() => {
        if (searchText?.length >= 0) {
          filterRestaurant();
          window.scrollTo(0, 0);
        }
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchText, activeFilters, restaurantList]);

  const handleFilterClick = (filter) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
    filterRestaurant();
  };


  const shimmerCount = isMobile ? 8 : isTablet ? 12 : isDesktop ? 16 : 6;

  return loading ? (
    <Shimmer count={shimmerCount} />
  ) : (
    <div className="flex items-center flex-col">
      <div className="pt-20 w-3/4">
        <CategoryCarousel categories={foodType} userName={userData?.firstName} />
        <div className="flex items-center justify-center py-4 m-1">
          <input
            className="border border-gray-300 rounded-md py-2 px-5 mr-2 focus:outline-none w-80"
            type="text"
            placeholder="Search for restaurants and food"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="items-center bg-orange-400 p-1 mx-4 rounded-md text-white hover:bg-orange-600 hover:shadow hover:shadow-green-500 transition ease-linear duration-200"
            onClick={() => filterRestaurant()}
            disabled={isFiltering}
          >
            {isFiltering ? "Filtering..." : "Search"}
          </button>
        </div>
        <FilterOptions onFilterClick={handleFilterClick} activeFilters={activeFilters} />
        {isFiltering && <p>Filtering restaurants...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
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
              {loadingForMoreRes && Array(10)
                .fill('')
                .map(() => (
                  <ShimmerRestrudentCard key={Math.random()} className={"pt-20"} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
