import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { VStack } from "native-base";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setTokens } from "../state/user/slice";

export default function TabFourScreen() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Is The Fourth Tab</Text>

      <VStack>
        <ButtonComponent
          onPress={() => {
            dispatch(
              setTokens({
                accessToken: "",
                refreshToken: "",
              })
            );
            router.replace("/(auth)");
          }}
          title="Logout"
        />
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
