// src/hooks/useGeolocation.js
import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError("You have blocked Foodiewoodie from tracking your location. To use this app, change your location settings in the browser.");
      }
    );
  }, []);

  return { geolocation, error };
};

export default useGeolocation;
