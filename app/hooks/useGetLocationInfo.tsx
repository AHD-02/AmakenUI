import { useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { AddressTypeForLocationHook } from "../types";

const useGetLocationInfo = () => {
  const [locationInfo, setLocationInfo] = useState<AddressTypeForLocationHook>();

  const getLocation = useCallback(
    async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBRTCUpxhOYTaxtjSKgCvArWKAtzB6ggG0`
        );
        
        const data = await response?.json();

        if (data.status === "OK") {
          const results = data?.results[0];
          const country = results?.address_components?.find((component: any) =>
            component?.types?.includes("country")
          );
          const city = results.address_components.find((component: any) =>
            component?.types?.includes("locality")
          );

          const address = {
            city: city,
            country: country,
          };

          setLocationInfo(address);
          return address;
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: `Error getting location: ${error}`,
        });
      }
    },
    [locationInfo]
  );

  return {
    locationInfo,
    getLocation,
  };
};

export default useGetLocationInfo;
