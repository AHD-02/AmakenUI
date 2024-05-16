import React from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import { Box, Image } from "native-base";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapStyle from "./style";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "@/app/types";

interface Coords {
  longitude: number;
  latitude: number;
}

interface IProps {
  latitude?: number;
  longitude?: number;
  setCurrentLocationCoords?: React.Dispatch<React.SetStateAction<Coords>>;
}

const initialRegion = {
  latitude: 31.94639,
  longitude: 35.97468,
};

const MapComponent = ({
  latitude = initialRegion.latitude,
  longitude = initialRegion.longitude,
  setCurrentLocationCoords,
}: IProps) => {
  return (
    <MapView
      onPress={Keyboard.dismiss}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      customMapStyle={MapStyle}
      initialRegion={{
        ...initialRegion,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={[StyleSheet.absoluteFillObject, { width: "100%", height: 250 }]}
    >
      {latitude && longitude && (
        <Marker
          draggable
          coordinate={{
            latitude,
            longitude,
          }}
        >
          <Box width={53} height={76}>
            <Ionicons name="pin" color={primaryColor} size={35} />
          </Box>
        </Marker>
      )}
    </MapView>
  );
};

export default MapComponent;
