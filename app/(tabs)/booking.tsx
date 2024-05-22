import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, HStack } from "native-base";
import { useSearchReservedEventsQuery } from "../data/events";
import DynamicHeader from "@/components/header";
import EventCard from "@/components/homePageComponent/eventCard";
import { useIsLoggedIn } from "../state/user/hooks";
import { router } from "expo-router";
import GuestScreen from "@/components/sharedComponents/guestUserSscreen/guestScreen";

const Booking = () => {
  const { data: events } = useSearchReservedEventsQuery();
  const isLoggedIn = useIsLoggedIn();

  return (
    <View style={styles.container}>
      <DynamicHeader isBGHidden />

      {isLoggedIn ? (
        <ScrollView>
          <VStack style={{ paddingHorizontal: 20 }} space={5}>
            <HStack space={2} mt={4}>
              <ScrollView paddingBottom={2}>
                {events?.map((item: any) => (
                  <EventCard
                    key={`${item?.userEmail}-${item.eventId}`}
                    isBookingComponent
                    title={item.name ?? ""}
                    city={item.placeName ?? ""}
                    image={item.images[0] ?? ""}
                    onPress={() =>
                      router.push(`/(bookEvent)/ticket/${item?.reservationId}`)
                    }
                    rate={"5.5"}
                    description={item.description ?? ""}
                  />
                ))}
              </ScrollView>
            </HStack>
          </VStack>
        </ScrollView>
      ) : (
        <GuestScreen
          title="Searching for your Bookinngs?"
          description="Login to find them all"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Booking;
