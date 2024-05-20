import { View, VStack, KeyboardAvoidingView, ScrollView } from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
  AssignOnMap,
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
import { useCreatePublicPlaceMutation } from "../data/publicPlace";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { imageUrlResolver } from "../utils/imageUtils";

const AddPublicPlace = () => {
  const { data } = usePublicPlaceCategoriesQuery();
  const [createPlace, res] = useCreatePublicPlaceMutation();

  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: publicPlaceInitialValues(),
    validationSchema: publicPlaceValidationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      createPlace(values);
    },
  });

  useEffect(() => {
    if (res?.error) {
      Toast.show({
        type: "error",
        text1: JSON.stringify((res?.error as any)?.data),
      });
    }

    if (res.isSuccess) {
      Toast.show({
        type: "sucess",
        text1: "Place have been created successfully",
      });

      router.push("/(tabs)/index");
    }
  }, [res]);

  const { upload, images, isLoading } = useUploadImage();

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setFieldValue("images", [...(values.images || []), images?.[0]]);
    }
  }, [images]);

  const handleTakeImage = async () => {
    const image = await useTakeImage();
    if (image) {
      upload([image]);
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
                <ImageContainer
                  key={img ?? ""}
                  imageUrl={imageUrlResolver(img ?? "")}
                />
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

          <AssignOnMap
            latitude={values?.latitude}
            longitude={values?.longitude}
            setLognLat={(locatoin) => {
              setFieldValue("latitude", locatoin.latitude);
              setFieldValue("longitude", locatoin.longitude);
            }}
          />

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
