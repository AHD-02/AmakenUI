import React, { useEffect } from "react";
import { View, VStack, ScrollView, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
  AssignOnMap,
  ButtonComponent,
  TextAreaInput,
} from "@/components/sharedComponents";
import { usePublicPlaceCategoriesQuery } from "../data/lookup";
import { useFormik } from "formik";
import {
  publicPlaceInitialValues,
  publicPlaceValidationSchema,
} from "../types/publicPlaceType";
import WarningMessage from "@/components/sharedComponents/warningMessage";
import ImageContainer from "@/components/sharedComponents/imageContainer";
import { usePickImage, useUploadImage } from "../hooks";
import { useCreatePublicPlaceMutation } from "../data/publicPlace";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { imageUrlResolver } from "../utils/imageUtils";
import CheckNameWithInput from "./place/components/checkName";
import { useEnhanceTextMutation } from "../data/user";
import { StyleSheet } from "react-native";
import EnhanceByAi from "./components/enhanceAIButton";

const AddPublicPlace = () => {
  const { data } = usePublicPlaceCategoriesQuery();
  const [createPlace, res] = useCreatePublicPlaceMutation();
  const [enhance, resp] = useEnhanceTextMutation();

  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: publicPlaceInitialValues(),
    validationSchema: publicPlaceValidationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      createPlace(values);
    },
  });

  useEffect(() => {
    if (res?.isError) {
      Toast.show({
        type: "error",
        text1: JSON.stringify((res?.error as any)?.data),
      });
    }

    if (res.isSuccess) {
      Toast.show({
        type: "success",
        text1: "Place have been created successfully",
      });
      router.push("/(tabs)");
    }
  }, [res]);

  const { upload, images } = useUploadImage();

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setFieldValue("images", [...(values.images || []), images?.[0]]);
    }
  }, [images]);

  const handleUploadImage = async () => {
    const image = await usePickImage();
    if (image) {
      upload([image]);
    }
  };

  const handleDelete = (image: string) => {
    setFieldValue(
      "images",
      values.images.filter((img) => img != image)
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} paddingY={3} space={"2"}>
          <UploadPhotos onPress={handleUploadImage} />

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
                  onDelete={() => handleDelete(img)}
                />
              ))}
            </ScrollView>
          )}

          <View>
            <CheckNameWithInput
              label="Place Name"
              placeholder="Name"
              setValue={(value) => setFieldValue("name", value)}
              value={values?.name}
            />
          </View>

          <AssignOnMap
            latitude={values?.latitude ?? 0}
            longitude={values?.longitude ?? 0}
            setLognLat={(location) => {
              setFieldValue("latitude", location.latitude);
              setFieldValue("longitude", location.longitude);
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
            {values?.description && (
              <EnhanceByAi
                handleEnhance={() => enhance(values?.description)}
                response={resp}
                setValue={(value) => setFieldValue("description", value)}
              />
            )}
          </View>
        </VStack>

        <View alignItems={"flex-end"} marginTop={140}>
          <ButtonComponent title="Create Place" onPress={submitForm} />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddPublicPlace;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "white",
  },
});
