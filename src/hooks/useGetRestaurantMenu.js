import { useState, useEffect } from 'react';
import { REST_API_MENU_URL } from '../utils/config';

const useGetRestaurantMenu = (restaurantId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      setLoading(true);
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const url = `${REST_API_MENU_URL}page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&submitAction=ENTER&restaurantId=${restaurantId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant menu');
        }
        
        const json = await response.json();
        const modifiedData = {
            info: json?.data?.cards[2]?.card?.card?.info,
            groupedCards: json?.data?.cards
              ?.find((o) => o?.groupedCard)
              .groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                (o) => o?.card?.card?.itemCards || o?.card?.card?.categories
              )
          };
    
        setRestaurantMenu(modifiedData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantMenu();
  }, [restaurantId]);

  return { restaurantMenu, loading, error };
};

export default useGetRestaurantMenu;
