import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, Text, HStack, Stack ,Image} from "native-base";
import { Hiking, LOGO } from "@/assets/images";
import { useSearchEventsQuery } from "../data/events";
import { SearchEventsResponse } from "../types";
import DynamicHeader from "@/components/header";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import EventCard from "@/components/homePageComponent/eventCard";
import { useIsLoggedIn } from "../state/user/hooks";
import { ButtonComponent } from "@/components/sharedComponents";
import { router } from "expo-router";
import GuestScreen from "@/components/sharedComponents/guestUserSscreen/guestScreen";

const Booking = () => {
  const { data: events } = useSearchEventsQuery()
  const { data: publicPlaces } = useSearchPublicPlacesQuery()
  const isLoggedIn = useIsLoggedIn();


  return (
    <View style={styles.container}>
      <DynamicHeader isBGHidden/>

      {isLoggedIn?(
        <ScrollView>
        <VStack style={{ paddingHorizontal: 20 }} space={5}>

          <HStack space={2} mt={4}>
          
          <ScrollView paddingBottom={2}>
              {events?.map((item: SearchEventsResponse) =>
                <EventCard
                  key={`${item?.userEmail}-${item.eventId}`}
                  isBookingComponent
                  title={item.name ?? ''}
                  city={item.city ?? ''}
                  image={item.images[0] ?? ''}
                  onPress={() => {}}
                  rate={'5.5'}
                  description={item.description ?? ''} //TODO: add location description
                />
              )}
            </ScrollView>
            
          </HStack>

        </VStack>
      </ScrollView>
      ):(
       <GuestScreen
       title="Searching for your Bookinngs?"
       description="Login to find them all"
       />
      )}

      
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

