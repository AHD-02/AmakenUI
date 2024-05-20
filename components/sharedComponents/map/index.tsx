import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import { Box, useTheme } from "native-base";
import MapView, {
  Circle,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapStyle from "./style";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "@/app/types";
import * as Location from "expo-location";

export interface CoordsType {
  longitude?: number;
  latitude?: number;
}

interface IProps {
  latitude?: number;
  longitude?: number;
  setCurrentLocationCoords?: (vals: CoordsType) => void;
}

const getCircles = (latitude: number, longitude: number) => [
  {
    radius: 1050,
    color: "rgba(165, 88, 58, 0.17)",
    center: { latitude, longitude },
  },
  {
    radius: 1000,
    color: "rgba(165, 88, 58, 0.1)",
    center: { latitude, longitude },
  },
  {
    radius: 750,
    color: "rgba(165, 88, 58, 0.2)",
    center: { latitude, longitude },
  },

  {
    radius: 500,
    color: "rgba(165, 88, 58, 0.3)",
    center: { latitude, longitude },
  },
  {
    radius: 300,
    color: "rgba(165, 88, 58, 0.3)",
    center: { latitude, longitude },
  },
  {
    radius: 90,
    color: "rgba(165, 88, 58, 0.4)",
    center: { latitude, longitude },
  },
  {
    radius: 60,
    color: "rgba(165, 88, 58, 1)",
    center: { latitude, longitude },
  },
];

const MapComponent = ({
  latitude = 31.94639,
  longitude = 35.97468,
  setCurrentLocationCoords,
}: IProps) => {
  const { colors } = useTheme();

  const [location, setLocation] = useState<CoordsType>({
    latitude: latitude,
    longitude: longitude,
  });
  const [showCircles, setShowCircles] = useState(true);
  const [circlePosition, setCirclePosition] = useState<CoordsType>({});

  const onDragStart = () => {
    setShowCircles(false);
  };

  const onDragEnd = (e: MarkerDragStartEndEvent) => {
    setShowCircles(true);
    setCurrentLocationCoords?.(e.nativeEvent.coordinate);
    setLocation(e.nativeEvent.coordinate);
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    const locationCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(locationCoords);
    setCurrentLocationCoords?.(locationCoords);
  };

  useLayoutEffect(() => {
    userLocation();
  }, []);

  return (
    <MapView
      onPress={Keyboard.dismiss}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      customMapStyle={MapStyle}
      //@ts-ignore
      initialRegion={{
        ...(location || { latitude, longitude }),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: location?.latitude || latitude,
        longitude: location?.longitude || longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={[StyleSheet.absoluteFillObject, { width: "110%", height: 1000 }]}
    >
      {latitude &&
        longitude &&
        showCircles &&
        getCircles(
          circlePosition?.latitude || latitude,
          circlePosition?.longitude || longitude
        ).map((circle, index) => {
          return (
            <Circle
              key={index}
              radius={circle.radius}
              center={circle.center}
              fillColor={circle.color}
              strokeColor={index === 4 ? colors.white : circle.color}
              strokeWidth={index === 4 ? 3 : 0.1}
            />
          );
        })}
      {latitude && longitude && (
        <Marker
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrag={(e) => setCirclePosition(e.nativeEvent.coordinate)}
          coordinate={{
            latitude,
            longitude,
          }}
        >
          <Box width={53} height={76}>
            <Ionicons name="pin" color={primaryColor} size={50} />
          </Box>
        </Marker>
      )}
    </MapView>
  );
};

export default MapComponent;
