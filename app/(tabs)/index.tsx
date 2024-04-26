import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { ScrollView, VStack, Text, HStack } from "native-base";
import { EventImage } from "@/assets/images";
import { useSearchEventsQuery } from "../data/events";
import { SearchEventsResponse } from "../types";
import DynamicHeader from "@/components/header";
import { Link } from "expo-router";
import { colors } from "../theme/Colors";
import EventPage from "@/components/homePageComponent/eventCard";

const Home = () => {
  const { data } = useSearchEventsQuery()

  return (
    <View style={styles.container}>
        <DynamicHeader />
        <View style={{ paddingHorizontal: 20 }}>

          <VStack space={2}>
            <HStack justifyContent={'space-between'}>
            <Text>Events for you</Text>
            <Link href={'/(tabs)/'} style={{alignSelf: 'center', color: colors.primary}}>view all</Link>
            </HStack>
            <ScrollView horizontal paddingBottom={2}>
              {data?.map((item: SearchEventsResponse) =>
                <EventPage
                  title={item.name ?? ''}
                  city={item.location ?? ''} //TODO: ADD CITY
                  image={item.images[0] ?? EventImage}
                  onPress={() => { }}
                  rate={'3.5'}
                  description={item.description ?? ''} //TODO: add location description
                />
              )}
            </ScrollView>
          </VStack>

          <VStack space={2}>
            <Text>Events for you</Text>
            <ScrollView horizontal paddingBottom={2}>
              {data?.map((item: SearchEventsResponse) =>
                <EventPage
                  title={item.name ?? ''}
                  city={item.location ?? ''} //TODO: ADD CITY
                  image={item.images[0] ?? EventImage}
                  onPress={() => { }}
                  rate={'3.5'}
                  description={item.description ?? ''} //TODO: add location description
                />
              )}
            </ScrollView>
          </VStack>

        </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
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
