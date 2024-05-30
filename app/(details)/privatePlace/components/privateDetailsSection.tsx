import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { LocationIcon } from "@/assets/icons";
import MapView from "react-native-maps";
import { LATITUDE, LONGITUDE, IPrivatePlaceResponse } from "@/app/types";
import useGetLocationInfo from "@/app/hooks/useGetLocationInfo";
import { ButtonComponent } from "@/components/sharedComponents";

interface IProps {
  data?: IPrivatePlaceResponse;
}

const PrivateDetailsSection = ({ data }: IProps) => {
  const { getLocation, locationInfo } = useGetLocationInfo();
  const [isRateOpen, setIsRateOpen] = useState<boolean>(false)

  useEffect(() => {
    if (data?.longitude && data?.latitude) {
      getLocation(data?.latitude, data?.longitude);
    }
  }, [data?.longitude, data?.latitude]);

  return (
    <View style={styles.container}>
      <VStack space={6}>
        <Text style={styles.title}>
          {`${data?.placeName ?? ""} - ${
            locationInfo?.city?.long_name ?? ""
          }`}
        </Text>          
          {/* <Text style={styles.reviews}>
            {`(${data?.numberOfRates ?? 0} Rates)`}
          </Text> */}
        <HStack space={1}>
          <LocationIcon />
          <Text
            style={styles.location}
          >{`${locationInfo?.city?.long_name}, ${locationInfo?.country?.long_name}`}</Text>
        </HStack>
        <VStack space={3}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            {data?.description ?? ""}
          </Text>
          <View style={{ height: "auto" }}>
            <MapView
              style={{ width: "100%", height: 250 }}
              initialRegion={{
                latitude: data?.latitude ?? LATITUDE,
                longitude: data?.longitude ?? LONGITUDE,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
          </View>
        </VStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
  },
  rate: {
    fontWeight: "500",
    fontSize: 14,
  },
  reviews: {
    fontWeight: "500",
    fontSize: 12,
    color: "#6B0AB9",
    alignSelf: "center",
  },
  location: {
    fontWeight: "500",
    fontSize: 12,
    color: "#8E8E93",
    alignSelf: "center",
  },
  descriptionTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    textAlign: "justify",
    color: "#8E8E93",
  },
});

export default PrivateDetailsSection;