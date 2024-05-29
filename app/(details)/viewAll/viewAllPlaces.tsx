import { View, ScrollView } from "react-native";
import React from "react";
import { PublicPlaceResponse } from "@/app/types";
import { router } from "expo-router";
import { VStack, HStack } from "native-base";
import { useSearchPublicPlacesQuery } from "../../data/publicPlace";
import PlaceCard from "@/components/homePageComponent/placeCard";
import { imageUrlResolver } from "@/app/utils/imageUtils";

const viewAllPlaces = () => {
  const { data } = useSearchPublicPlacesQuery();

  return (
    <View style={{ backgroundColor: "white", padding: 10 }}>
      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          <ScrollView >
            <HStack
              justifyContent={"space-between"}
              space={3}
              flexWrap={"wrap"}
            >
              {data?.map((item: PublicPlaceResponse) => (
              <View style={{ width: '35%', marginBottom: 25 }}>
                <PlaceCard
                  key={`${item?.publicPlaceId}-${item.userEmail}`}
                  title={item.name ?? ""}
                  city={item.city ?? "-"}
                  image={imageUrlResolver(item.images[0] ?? "")}
                  description={item.description ?? ""}
                  onCardPress={() =>
                    router.push(`/(details)/place/${item.publicPlaceId}`)
                  }
                />
            </View>
              ))}
            </HStack>
          </ScrollView>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default viewAllPlaces;
