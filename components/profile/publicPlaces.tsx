import { View, ScrollView } from "react-native";
import React from "react";
import {
  SearchEventsResponse,
} from "@/app/types";
import { router } from "expo-router";
import { VStack, HStack } from "native-base";
import PlaceCard from "../homePageComponent/placeCard";
import { useMyPlacesQuery } from "@/app/data/user";
import { imageUrlResolver } from "@/app/utils/imageUtils";
import { useSearchSavedEventsQuery } from "@/app/data/events";

interface IProps {
  isSaved?: boolean;
}

const PublicPlaces = ({ isSaved }: IProps) => {
  const { data: publicPlaces } = useMyPlacesQuery();
  const { data } = useSearchSavedEventsQuery();

  return (
    <View>
      <ScrollView>
        <VStack style={{ paddingHorizontal: 15 }} space={3}>
          <ScrollView>
            {isSaved ? (
              <HStack
                justifyContent={"space-between"}
                flexWrap={"wrap"}
                width={"100%"}
              >
                {data?.map((item: SearchEventsResponse) => (
                  <View style={{ width: "35%", marginBottom: 30 }}>
                    <PlaceCard
                      title={item.name ?? ""}
                      city={item.city ?? "-"}
                      image={imageUrlResolver(item.images[0] ?? "")}
                      description={item.description ?? ""}
                      onCardPress={() =>
                        router.push(`/(details)/events/${item.eventId ?? ""}`)
                      }
                    />
                  </View>
                ))}
              </HStack>
            ) : (
              <HStack
                justifyContent={"space-between"}
                space={2}
                flexWrap={"wrap"}
              >
                {publicPlaces?.map((item: any) => (
                  <View style={{ width: "32%", marginBottom: 25 }}>
                    <PlaceCard
                      key={`${item.publicPlaceId}-${item.userEmail}`}
                      title={item.name ?? ""}
                      city={"City"}
                      image={imageUrlResolver(item.images[0] ?? "")}
                      description={item.description ?? ""}
                      onCardPress={() =>
                        router.push(`/(details)/place/${item.publicPlaceId}`)
                      }
                    />
                  </View>
                ))}
              </HStack>
            )}
          </ScrollView>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default PublicPlaces;
