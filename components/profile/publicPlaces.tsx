import { View, ScrollView } from "react-native";
import React from "react";
import { PublicPlaceResponse } from "@/app/types";
import { router } from "expo-router";
import { VStack, HStack } from "native-base";
import PlaceCard from "../homePageComponent/placeCard";
import { useMyPlacesQuery } from "@/app/data/user";
import { imageUrlResolver } from "@/app/utils/imageUtils";

const PublicPlaces = () => {
  const { data } = useMyPlacesQuery();

  return (
    <View>
      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          <ScrollView>
            <HStack
              justifyContent={"space-between"}
              space={3}
              flexWrap={"wrap"}
            >
              {data?.map((item: PublicPlaceResponse) => (
                <PlaceCard
                  key={`${item?.publicPlaceId}-${item.userEmail}`}
                  title={item.name ?? ""}
                  city={"City"}
                  image={imageUrlResolver(item.images[0] ?? "") }
                  description={item.description ?? ""}
                  onCardPress={() =>
                    router.push(`/(details)/place/${item.publicPlaceId}`)
                  }
                />
              ))}
            </HStack>
          </ScrollView>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default PublicPlaces;
