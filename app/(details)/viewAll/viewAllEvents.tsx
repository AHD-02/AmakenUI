import { StyleSheet, View } from "react-native";
import React from "react";
import { useSearchEventsQuery } from "@/app/data/events";
import { SearchEventsResponse } from "@/app/types";
import { imageUrlResolver } from "@/app/utils/imageUtils";
import { router } from "expo-router";
import { VStack, HStack, ScrollView } from "native-base";
import EventCard from "@/components/homePageComponent/eventCard";
import { useIsLoggedIn } from "@/app/state/user/hooks";

const ViewAllEvents = () => {
  const { data: events } = useSearchEventsQuery();

  return (
    <View style={styles.container}>
      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          {Array.isArray(events) && events.length > 0 && (
            <HStack space={2} mt={4}>
              <ScrollView paddingBottom={2}>
                {events?.map((item: SearchEventsResponse, index: number) => (
                  <EventCard
                    key={`${item.eventId}-${index}`}
                    id={item.eventId ?? ""}
                    title={item.name ?? ""}
                    city={item.placeID ?? ""}
                    onPress={() =>
                      router.push(`/(details)/events/${item?.eventId ?? ""}`)
                    }
                    image={imageUrlResolver(item.images[0] ?? "")}
                    rate={"3.5"}
                    description={item.description ?? ""}
                    isBookingComponent
                  />
                ))}
              </ScrollView>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default ViewAllEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
