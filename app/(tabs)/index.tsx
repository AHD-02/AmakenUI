import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { VStack } from "native-base";
import EventPage from "@/components/homePageComponent/eventCard";
import { EventImage } from "@/assets/images";
import CustomCard from "@/components/homePageComponent/customCard";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello Team This Is A Demo Component For The Setup
      </Text>

      <VStack>
        <EventPage
          title={"Burj Al Hamam"}
          city={"Dead Sea"}
          image={EventImage}
          onPress={() => {}}
          rate={"3.5"}
          description={"Crowne Plaza Dead Sea Resort & Spa.."}
        />

       
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 50,
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
