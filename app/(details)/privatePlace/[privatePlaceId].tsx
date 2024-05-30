import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useGetPublicPlaceQuery } from "@/app/data/publicPlace";
import ImagesSection from "../place/components/imagesSection";
import DetailsSection from "../place/components/detailsSection";
import { useGetPrivatePlacesQuery } from "@/app/data/privatePlace";
import PrivateImagesSection from "./components/privateImagesSection";
import PrivateDetailsSection from "./components/privateDetailsSection";

const PrivatePlaceDetails = () => {
  const local = useLocalSearchParams();
  const { data, error } = useGetPrivatePlacesQuery(
    (local.privatePlaceId as string) ?? ""
  );

  useEffect(() => {
    if (error)
      Toast.show({
        type: "error",
        text1: JSON.stringify((error as any)?.data),
      });
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <PrivateImagesSection data={data} />
      </View>
      <View style={styles.detailsContainer}>
        <PrivateDetailsSection data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    width: "100%",
    height: "40%",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    width: "100%",
    height: "64%",
    backgroundColor: "white",
    borderTopEndRadius: 34,
    borderTopStartRadius: 34,
  },
});

export default PrivatePlaceDetails;