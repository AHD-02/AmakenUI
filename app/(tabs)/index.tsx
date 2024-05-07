import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, Text, HStack, IconButton } from "native-base";
import { EventImage, Hiking } from "@/assets/images";
import { useSearchEventsQuery } from "../data/events";
import { SearchEventsResponse } from "../types";
import DynamicHeader from "@/components/header";
import { Link, router } from "expo-router";
import { colors } from "../theme/Colors";
import EventPage from "@/components/homePageComponent/eventCard";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import PlaceCard from "@/components/homePageComponent/placeCard";
import { PublicPlaceResponse } from "../types/places";
import { Ionicons } from "@expo/vector-icons";
import IconButtonComponent from "@/components/sharedComponents/iconButton";

const Home = () => {
  const { data: events } = useSearchEventsQuery();
  const { data: publicPlaces } = useSearchPublicPlacesQuery();

  return (
    <View style={styles.container}>
      <DynamicHeader />

      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>
          <VStack space={2} mt={4}>
            <HStack justifyContent={"space-between"}>
              <Text>Events for you</Text>
              <Link
                href={"/(tabs)/"}
                style={{ alignSelf: "center", color: colors.primary }}
              >
                view all
              </Link>
            </HStack>
            <ScrollView horizontal paddingBottom={2}>
              {events?.map((item: SearchEventsResponse, index: number) => (
                <EventPage
                  key={`${item.eventId}-${index}`}
                  id={item.eventId ?? ""}
                  title={item.name ?? ""}
                  city={item.location ?? ""} //TODO: ADD CITY
                  onPress={() =>
                    router.push(`/(details)/events/${item.eventId ?? ""}`)
                  }
                  image={item.images[0] ?? Hiking}
                  rate={"3.5"}
                  description={item.description ?? ""} //TODO: add location description
                />
              ))}
            </ScrollView>
          </VStack>

          <VStack space={2}>
            <HStack justifyContent={"space-between"}>
              <Text>Places for you</Text>
              <Link
                href={"/(tabs)/"}
                style={{ alignSelf: "center", color: colors.primary }}
              >
                view all
              </Link>
            </HStack>

            <HStack
              justifyContent={"space-between"}
              space={3}
              flexWrap={"wrap"}
            >
              {publicPlaces?.map((item: PublicPlaceResponse) => (
                <PlaceCard
                  title={item.name ?? ""}
                  city={item.location ?? ""}
                  image={EventImage} //TODO: item.images[0]
                  description={item.description ?? ""}
                  onCardPress={() => router.push(`/(details)/place/${item.publicPlaceId}`)}
                />
              ))}
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <IconButtonComponent
        onPress={() => router.push("/(details)/addPublicPlace")}
        icon={<Ionicons name="add" color={"white"} size={25} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
