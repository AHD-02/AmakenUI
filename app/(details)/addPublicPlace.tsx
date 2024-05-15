import { View, VStack, KeyboardAvoidingView, ScrollView } from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
  ButtonComponent,
  TextAreaInput,
  TextInput,
} from "@/components/sharedComponents";
import { StyleSheet } from "react-native";
import { usePublicPlaceCategoriesQuery } from "../data/lookup";
import { useFormik } from "formik";
import {
  publicPlaceInitialValues,
  publicPlaceValidationSchema,
} from "../types/publicPlaceType";
import WarningMessage from "@/components/sharedComponents/warningMessage";
import ImageContainer from "@/components/sharedComponents/imageContainer";
import { useTakeImage, useUploadImage } from "../hooks";

const AddPublicPlace = () => {
  const { data } = usePublicPlaceCategoriesQuery();

  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: publicPlaceInitialValues(),
    validationSchema: publicPlaceValidationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { upload, images, isLoading } = useUploadImage();

  const handleTakeImage = async () => {
    const image = await useTakeImage();
    if (image) {
      upload([image])
        .unwrap()
        .then(() => {
          if (Array.isArray(images)) {
            setFieldValue("images", [...(values.images || []), images?.[0]]);
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} paddingY={3} space={"2"}>
          <UploadPhotos onPress={handleTakeImage} />

          {Boolean(errors.images) && (
            <WarningMessage
              title={errors.images?.[0] ?? ""}
              stylingBox={{ marginTop: 2, marginBottom: 8 }}
            />
          )}

          {Array.isArray(values?.images) && (
            <ScrollView horizontal paddingBottom={2}>
              {values.images.map((img) => (
                <ImageContainer key={img ?? ""} imageUrl={`https://${img}`} />
              ))}
            </ScrollView>
          )}

          <View>
            <TextInput
              label="Place Name"
              placeholder="Name"
              onChangeText={(value) => setFieldValue("name", value)}
              value={values?.name}
            />
          </View>

          <View>
            <Dropdown
              label="Categories"
              placeHolder="Select"
              items={data ?? []}
              selectedValue={values?.categoryId?.toString() ?? ""}
              setSelectedValue={(value) => setFieldValue("categoryId", value)}
            />
          </View>

          <View>
            <TextAreaInput
              label="Description"
              placeholder="description"
              onChangeText={(value) => setFieldValue("description", value)}
              value={values?.description}
            />
          </View>
        </VStack>

        <View alignItems={"flex-end"} marginTop={140}>
          <ButtonComponent title="Create Place" onPress={submitForm} />
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
