import { View, ScrollView } from "react-native";
import React from "react";
import { SearchEventsResponse } from "@/app/types";
import { router } from "expo-router";
import { VStack, HStack } from "native-base";
import EventCard from "../homePageComponent/eventCard";
import { useMyEventsQuery } from "@/app/data/user";
import { imageUrlResolver } from "@/app/utils/imageUtils";
import { useSearchSavedEventsQuery } from "@/app/data/events";

interface IProps {
  isSaved?: boolean;
}
const Events = ({ isSaved }: IProps) => {
  const { data: events } = useMyEventsQuery();
  const { data } = useSearchSavedEventsQuery();

  return (
    <View>
      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          <HStack space={2} mt={4}>
            <ScrollView>
              {isSaved ? (
                <View>
                  {data?.map((item: SearchEventsResponse) => (
                    <EventCard
                      key={`${item?.userEmail}-${item.eventId}`}
                      isBookingComponent
                      title={item.name ?? ""}
                      city={"City"} //TODO: ADD CITY
                      image={imageUrlResolver(item.images[0] ?? "")}
                      onPress={() => {}}
                      rate={"5.5"}
                      onCardPress={() =>
                        router.push(`/(details)/event/${item.eventId ?? ""}`)
                      }
                      description={item.description ?? ""}
                    />
                  ))}
                </View>
              ) : (
                <View>
                  {events?.map((item: SearchEventsResponse) => (
                    <EventCard
                      key={`${item?.userEmail}-${item.eventId}`}
                      isBookingComponent
                      title={item.name ?? ""}
                      city={"City"} //TODO: ADD CITY
                      image={imageUrlResolver(item.images[0] ?? "")}
                      onPress={() => {}}
                      rate={"5.5"}
                      onCardPress={() =>
                        router.push(`/(details)/event/${item.eventId ?? ""}`)
                      }
                      description={item.description ?? ""}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          </HStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default Events;
