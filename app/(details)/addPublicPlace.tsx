import { View, VStack, KeyboardAvoidingView, ScrollView } from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { StyleSheet } from "react-native";
import { Hiking } from "@/assets/images";
import UpPhoto from "@/components/sharedComponents/upPhoto/upPhoto";

const AddPublicPlace = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} paddingY={3} space={"2"}>
          <UploadPhotos />
          <View>
            <Dropdown label="Categories" items={[]} placeHolder="Select" />
          </View>

          <View>
            <TextInput
              onChangeText={() => {}}
              value=""
              label="Place Name"
              placeholder="Name"
            />
          </View>

          <View>
            <TextInput
              onChangeText={() => {}}
              value=""
              label="Location"
              placeholder="location"
            />
          </View>

          <View>
            <Dropdown label="Availability" items={[]} placeHolder="Select" />
          </View>
        </VStack>

        <View alignItems={"flex-end"} marginTop={140}>
          <ButtonComponent title="Create Place" onPress={() => {}} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default AddPublicPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 25,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});
