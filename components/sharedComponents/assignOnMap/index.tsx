import { Ionicons } from "@expo/vector-icons";
import { HStack, Pressable, View, Text } from "native-base";
import { useState } from "react";
import MapModal from "./mapModal";
import MapComponent, { CoordsType } from "../map";

interface IProps {
  title?: string;
  logitude?: number;
  latitude?: number;
  setLognLat?: (location: CoordsType) => void;
}

const AssignOnMap = ({ title, latitude, logitude, setLognLat }: IProps) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  
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
        >
          <View>
            <Text>{title ?? "Assign Location On Map"}</Text>
          </View>
          <View>
            <Ionicons name="location" size={25} />
          </View>
        </HStack>
      </Pressable>

      {isMapOpen && (
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          headerTitle="Assign Location On Map"
        >
          <MapComponent
            latitude={latitude}
            longitude={logitude}
            setCurrentLocationCoords={setLognLat}
          />
        </MapModal>
      )}
    </View>
  );
};
export default AssignOnMap;
