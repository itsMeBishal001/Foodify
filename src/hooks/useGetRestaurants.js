import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

const useGetRestaurants = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestList, setFilteredRestList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [geolocation, setGeolocation] = useState({});
    const [resultsFound, setResultsFound] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingForMoreRes, setLoadingForMoreRes] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [scrollPosition, setScrollPosition] = useState(0);
    const [restaurantCache, setRestaurantCache] = useState({});
    const [fetchingForOffset, setFetchingForOffset] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const REST_API_URL = `${API_BASE_URL}/api/restaurants?`;
    const REST_API_OFFSET_URL = `${API_BASE_URL}/api/restaurants?/list/v5/offset`;

    const initialFetchRef = useRef(true);

    const debouncedGetRestaurants = _.debounce(getRestaurants, 100);

    useEffect(() => {
        if (initialFetchRef.current) {
            debouncedGetRestaurants();
            initialFetchRef.current = false;
        }
    }, []); // Ensure getRestaurants is called once on mount

    async function getRestaurants() {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                setGeolocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                const data = await fetch(`${REST_API_URL}&lat=${position.coords.latitude}&lng=${position.coords.longitude}&page_type=DESKTOP_WEB_LISTING`);
                const json = await data.json();
                if (json.data) {
                    const data2 = [];
                    for (let i = 0; i < json.data.cards.length; i++) {
                        let checkData = json.data.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                        if (checkData !== undefined) {
                            data2.push(checkData);
                        }
                    }
                    setResultsFound(json.data.cards[2].data?.data?.totalRestaurants);
                    setRestaurantList(data2[0]);
                    setFilteredRestList(data2[0]);
                    setErrMsg("");
                }
            } catch (e) {
                setErrMsg(e.message);
            }
            setLoading(false);
        }, (err) => {
            setErrMsg("You have blocked Foodiewoodie from tracking your location. To use this app, change your location settings in the browser.");
            setLoading(false);
        });
    }

    async function getMoreRestaurants() {
        if (fetchingForOffset) return; // Prevent duplicate calls
        if (!geolocation.latitude || !geolocation.longitude) {
            setErrMsg("Geolocation is not set");
            return;
        }

        // Capture scroll position before fetching more data
        setScrollPosition(window.scrollY);
        setFetchingForOffset(true);
        setLoadingForMoreRes(true);

        try {
            const cachedData = restaurantCache[offset];
            if (cachedData) {
                setRestaurantList(prevList => [...prevList, ...cachedData]); // Use cached data
                setFilteredRestList(prevList => [...prevList, ...cachedData]); // Update filtered list with cached data
            } else {
                const data = await fetch(`${REST_API_OFFSET_URL}?=${offset}&lat=${geolocation.latitude}&lng=${geolocation.longitude}`);
                const json = await data.json();

                if (offset >= json.data.totalSize) {
                    setHasMore(false);
                } else {
                    const formattedList = [];
                    for (let i = 0; i < json.data.cards.length; i++) {
                        let checkData = json.data.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                        if (checkData !== undefined) {
                            formattedList.push(checkData);
                        }
                    }
                    setRestaurantList(prevRestList => [...prevRestList, ...formattedList[0]]);
                    setFilteredRestList(prevRestList => [...prevRestList, ...formattedList[0]]);
                    setRestaurantCache(prevCache => ({ ...prevCache, [offset]: formattedList[0] })); // Update cache
                }
            }
        } catch (error) {
            setErrMsg(error.message);
        } finally {
            setFetchingForOffset(false); // Reset flag
            setLoadingForMoreRes(false);
            window.scrollTo(0, scrollPosition); // Restore scroll position after fetching more data
        }
    }

    useEffect(() => {
        if (offset > 0 && hasMore) {
            getMoreRestaurants();
        }
    }, [offset, hasMore]);

    return [resultsFound, restaurantList, setRestaurantList, filteredRestList, setFilteredRestList, errMsg, setOffset, loading, setLoading, hasMore, loadingForMoreRes, scrollPosition];
}

export default useGetRestaurants;
