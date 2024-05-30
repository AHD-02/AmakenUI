import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, Text, HStack } from "native-base";
import { useSearchEventsQuery } from "../data/events";
import { SearchEventsResponse } from "../types";
import DynamicHeader from "@/components/header";
import { Link, router } from "expo-router";
import { colors } from "../theme/Colors";
import EventPage from "@/components/homePageComponent/eventCard";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import PlaceCard from "@/components/homePageComponent/placeCard";
import { PublicPlaceResponse } from "../types/places";
import AddEventsButton from "@/components/addEventsButton";
import { imageUrlResolver } from "../utils/imageUtils";

const Home = () => {
  const { data: events } = useSearchEventsQuery();
  const { data: publicPlaces } = useSearchPublicPlacesQuery();

  return (
    <View style={styles.container}>
      <DynamicHeader />

      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          {Array.isArray(events) && events.length > 0 && (
            <VStack space={2} mt={4}>
              <HStack justifyContent={"space-between"}>
                <Text>Events for you</Text>
                <Link
                  href={"/(details)/viewAll/viewAllEvents"}
                  style={{ alignSelf: "center", color: colors.primary }}
                >
                  view all
                </Link>
              </HStack>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {events
                  ?.slice(0, 5)
                  .map((item: SearchEventsResponse, index: number) => (
                    <EventPage
                      key={`${item.eventId}-${index}`}
                      id={item.eventId ?? ""}
                      title={item.name ?? ""}
                      city={item.placeName ?? ""}
                      onPress={() =>
                        router.push(`/(details)/events/${item.eventId ?? ""}`)
                      }
                      image={imageUrlResolver(item.images[0] ?? "")}
                      rate={"3.5"}
                      description={item.description ?? ""}
                    />
                  ))}
              </ScrollView>
            </VStack>
          )}

          {Array.isArray(publicPlaces) && publicPlaces.length > 0 && (
            <VStack space={2}>
              <HStack justifyContent={"space-between"}>
                <Text>Places for you</Text>
                <Link
                  href={"/(details)/viewAll/viewAllPlaces"}
                  style={{ alignSelf: "center", color: colors.primary }}
                >
                  view all
                </Link>
              </HStack>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {publicPlaces?.slice(0, 5).map((item: PublicPlaceResponse) => (
                  <PlaceCard
                    key={`${item.place?.publicPlaceId}-${item.place?.userEmail}`}
                    title={item.place?.name ?? ""}
                    city={item.place?.city ?? "-"}
                    image={imageUrlResolver(item.place?.images[0] ?? "")}
                    description={item.place?.description ?? ""}
                    onCardPress={() =>
                      router.push(`/(details)/place/${item.place?.publicPlaceId}`)
                    }
                  />
                ))}
              </ScrollView>
            </VStack>
          )}
        </VStack>
      </ScrollView>
      <AddEventsButton />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
});
