// src/hooks/useGetRestaurants.js
import { useState, useEffect } from 'react';
import useGeolocation from './useGeolocation';
import useFetchData from './useFetchData';

const useGetRestaurants = () => {
  const { geolocation, error: geoError } = useGeolocation();
  const [offset, setOffset] = useState(0);
  const { resultsFound, restaurantList, foodType33, errMsg, loading, loadingForMoreRes, hasMore } = useFetchData(geolocation, offset);

  const [filteredRestList, setFilteredRestList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setFilteredRestList(restaurantList);
  }, [restaurantList]);

  return {
    resultsFound,
    restaurantList,
    filteredRestList,
    setFilteredRestList,
    errMsg: geoError || errMsg,
    setOffset,
    loading,
    hasMore,
    loadingForMoreRes,
    scrollPosition,
    foodType33,
  };
};

export default useGetRestaurants;
