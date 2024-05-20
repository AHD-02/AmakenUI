import { Ionicons } from "@expo/vector-icons";
import { HStack, Pressable, View, Text } from "native-base";
import { useState } from "react";
import MapModal from "./mapModal";
import MapComponent, { CoordsType } from "../map";
import { primaryColor } from "@/app/types";

interface IProps {
  title?: string;
  longitude: number;
  latitude: number;
  setLognLat: (location: CoordsType) => void;
}

const AssignOnMap = ({ title, latitude, longitude, setLognLat }: IProps) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const hasCoords = latitude > 0 || longitude > 0;

  return (
    <View>
      <Pressable onPress={() => setIsMapOpen(true)}>
        <HStack
          color={"#191E3A"}
          backgroundColor={"#F3F5F5"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingX={3}
          flex={1}
          height={55}
          borderRadius={10}
          borderWidth={hasCoords ? 2 : 0}
          borderColor={primaryColor ? primaryColor : "none"}
        >
          <View>
            <Text>{title ?? "Assign Location On Map"}</Text>
          </View>
          <View>
            <Ionicons name="location" size={25} color={primaryColor} />
          </View>
        </HStack>
      </Pressable>

      {isMapOpen && (
        <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            setCurrentLocationCoords={setLognLat}
          />
        </MapModal>
      )}
    </View>
  );
};
export default AssignOnMap;
