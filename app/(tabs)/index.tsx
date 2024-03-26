import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { VStack } from "native-base";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello Team This Is A Demo Component For The Setup
      </Text>

      <VStack>
        <TextInput
          onChangeText={() => {}}
          value=""
          label="Email"
          placeholder="email"
        />
        <ButtonComponent onPress={() => {}} title="Login" />
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
