import { useState, useEffect } from 'react';
import _ from 'lodash';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REST_API_URL = `${API_BASE_URL}/api/restaurants?`;
const REST_API_OFFSET_URL = `${API_BASE_URL}/api/restaurants?/list/v5/offset`;

const useFetchData = (geolocation, offset) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [resultsFound, setResultsFound] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingForMoreRes, setLoadingForMoreRes] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [restaurantCache, setRestaurantCache] = useState({});
  const [fetchingForOffset, setFetchingForOffset] = useState(false);

  const debouncedFetchData = _.debounce(fetchData, 100);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      debouncedFetchData();
    }
  }, [geolocation]);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await fetch(`${REST_API_URL}&lat=${geolocation.latitude}&lng=${geolocation.longitude}&page_type=DESKTOP_WEB_LISTING`);
      const json = await data.json();
      if (json.data) {
        const restaurants = [];
        const foodType = json.data.cards[0]?.card?.card?.imageGridCards?.info || [];
        for (let i = 0; i < json.data.cards.length; i++) {
          const checkData = json.data.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (checkData !== undefined) {
            restaurants.push(checkData);
          }
        }
        setResultsFound(json.data.cards[2].data?.data?.totalRestaurants);
        setRestaurantList(restaurants[0]);
        setFoodType(foodType);
        setErrMsg("");
      }
    } catch (e) {
      setErrMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMoreRestaurants() {
    if (fetchingForOffset) return;
    setFetchingForOffset(true);
    setLoadingForMoreRes(true);
    try {
      const cachedData = restaurantCache[offset];
      if (cachedData) {
        setRestaurantList((prevList) => [...prevList, ...cachedData]);
      } else {
        const data = await fetch(`${REST_API_OFFSET_URL}?=${offset}&lat=${geolocation.latitude}&lng=${geolocation.longitude}`);
        const json = await data.json();
        if (offset >= json.data.totalSize) {
          setHasMore(false);
        } else {
          const formattedList = [];
          for (let i = 0; i < json.data.cards.length; i++) {
            const checkData = json.data.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if (checkData !== undefined) {
              formattedList.push(checkData);
            }
          }
          setRestaurantList((prevRestList) => [...prevRestList, ...formattedList[0]]);
          setRestaurantCache((prevCache) => ({ ...prevCache, [offset]: formattedList[0] }));
        }
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setFetchingForOffset(false);
      setLoadingForMoreRes(false);
    }
  }

  useEffect(() => {
    if (offset > 0 && hasMore) {
      fetchMoreRestaurants();
    }
  }, [offset, hasMore]);

  return {
    resultsFound,
    restaurantList,
    foodType,
    errMsg,
    loading,
    loadingForMoreRes,
    hasMore,
  };
};

export default useFetchData;
