import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, Text, HStack } from "native-base";
import { Hiking } from "@/assets/images";
import { useSearchEventsQuery } from "../data/events";
import { SearchEventsResponse } from "../types";
import DynamicHeader from "@/components/header";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import EventCard from "@/components/homePageComponent/eventCard";

const Booking = () => {
  const { data: events } = useSearchEventsQuery()
  const { data: publicPlaces } = useSearchPublicPlacesQuery()

  return (
    <View style={styles.container}>
      <DynamicHeader isBGHidden/>

      <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>

          <HStack space={2} mt={4}>
          
          <ScrollView paddingBottom={2}>
              {events?.map((item: SearchEventsResponse) =>
                <EventCard
                  key={`${item?.userEmail}-${item.eventId}`}
                  isBookingComponent
                  title={item.name ?? ''}
                  city={item.location ?? ''} //TODO: ADD CITY
                  image={item.images[0] ?? Hiking}
                  onPress={() => {}}
                  rate={'5.5'}
                  description={item.description ?? ''} //TODO: add location description
                />
              )}
            </ScrollView>
            
          </HStack>

        </VStack>
      </ScrollView>
    </View>
  );
}


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

export default Booking

