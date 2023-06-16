import { useState, useEffect, useCallback } from "react";

export const useCurrentLocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchCurrentLocation = useCallback(() => {
    setLoading(true);

    const successCallback = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({ lat: latitude, lng: longitude });

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7qVVLtW__w3qzqW5H4GejMYtTR7OGb5E`
        );
        const data = await response.json();
        const fetchedAddress =
          data.results[0]?.formatted_address || "Address not found";
        setAddress(fetchedAddress);
      } catch (error) {
        console.error("Error getting address:", error);
      } finally {
        setLoading(false);
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the geolocation request.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        default:
          console.log("An unknown error occurred.");
          break;
      }
      setLoading(false);
    };

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 15000,
      };
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, []);

  useEffect(() => {
    // Fetch the coordinates and address when the component mounts
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  return { coordinates, address, isLoading, fetchCurrentLocation };
};
