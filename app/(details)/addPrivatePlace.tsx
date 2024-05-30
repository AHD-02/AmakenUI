import React, { useEffect, useState } from "react";
import { View, VStack, ScrollView, HStack } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
  AssignOnMap,
  ButtonComponent,
  TextAreaInput,
  TextInput,
} from "@/components/sharedComponents";
import { usePrivatePlaceCategoriesQuery } from "../data/lookup";
import { useFormik } from "formik";
import WarningMessage from "@/components/sharedComponents/warningMessage";
import ImageContainer from "@/components/sharedComponents/imageContainer";
import { usePickImage, useUploadImage } from "../hooks";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { imageUrlResolver } from "../utils/imageUtils";
import CheckNameWithInput from "./place/components/checkName";
import { useEnhanceTextMutation } from "../data/user";
import { StyleSheet } from "react-native";
import {
  privatePlaceInitialValues,
  privatePlaceValidationSchema,
} from "../types";
import { usePrivatePlaceMutation } from "../data/privatePlace";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";
import EnhanceByAi from "./components/enhanceAIButton";

type imagesType = "None" | "Images" | "OwnerId" | "OwnerShip";

const AddPrivatePlace = () => {
  const { data } = usePrivatePlaceCategoriesQuery();
  const [createPlace, res] = usePrivatePlaceMutation();
  const [enhance, resp] = useEnhanceTextMutation();
  const [imageType, setImageType] = useState<imagesType>("None");

  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: privatePlaceInitialValues(),
    validationSchema: privatePlaceValidationSchema,
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

    if (resp?.error && "data" in resp?.error) {
      Toast.show({
        type: "success",
        text1: "Place have been created successfully",
      });
      router.push("/(tabs)");
    }
  }, [res]);

  const { upload, images } = useUploadImage();

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0 && imageType == "Images") {
      setFieldValue("images", [...(values.images || []), images?.[0]]);
    }
    if (Array.isArray(images) && images.length > 0 && imageType == "OwnerId") {
      setFieldValue("imageOfOwnerID", images?.[0]);
    }
    if (Array.isArray(images) && images.length > 0 && imageType == "OwnerShip") {
      setFieldValue("imageOfOwnershipProof", images?.[0]);
    }
  }, [images]);

  const handleUploadImage = async (type: imagesType) => {
    setImageType(type);
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
          <UploadPhotos onPress={() => handleUploadImage("Images")} />

          {Boolean(errors.images) && (
            <WarningMessage
              title={errors.images?.[0] ?? ""}
              stylingBox={{ marginTop: 2, marginBottom: 8 }}
            />
          )}

          {Array.isArray(values?.images) && (
            <ScrollView horizontal paddingBottom={2}>
              {values.images?.map((img) => (
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
              setValue={(value) => setFieldValue("placeName", value)}
              value={values?.placeName}
              label="Place Name"
              placeholder="Name"
              isPrivate
            />
          </View>

          <HStack justifyContent={"space-between"}>
            <View width={"46%"}>
              <DatePickerComponent
                value={values.availableFrom ?? ""}
                setValue={(val) => setFieldValue("availableFrom", val)}
                label="Opening time"
                mode="time"
                placeholder="00:00"
              />
            </View>
            <View width={"46%"}>
              <DatePickerComponent
                value={values.availableTo ?? ""}
                setValue={(val) => setFieldValue("availableTo", val)}
                label="Closing Time"
                placeholder="11:59"
                mode="time"
              />
            </View>
          </HStack>

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

          <UploadPhotos
            key={"imageOfOwnerID"}
            label="Image of National ID"
            onPress={() => handleUploadImage("OwnerId")}
          />

          {Boolean(errors.imageOfOwnerID) && (
            <WarningMessage
              title={errors.imageOfOwnerID ?? ""}
              stylingBox={{ marginTop: 2, marginBottom: 8 }}
            />
          )}

          {values?.imageOfOwnerID && (
            <ScrollView horizontal paddingBottom={2}>
              <ImageContainer
                key={values?.imageOfOwnerID ?? ""}
                imageUrl={imageUrlResolver(values?.imageOfOwnerID ?? "")}
                onDelete={() => setFieldValue("imageOfOwnerID", "")}
              />
            </ScrollView>
          )}

          <UploadPhotos
            key={"imageOfOwnershipProof"}
            label="Image of Owner Ship Proof"
            onPress={() => handleUploadImage("OwnerShip")}
          />

          {Boolean(errors.imageOfOwnershipProof) && (
            <WarningMessage
              title={errors.imageOfOwnershipProof ?? ""}
              stylingBox={{ marginTop: 2, marginBottom: 8 }}
            />
          )}

          {values?.imageOfOwnershipProof && (
            <ScrollView horizontal paddingBottom={2}>
              <ImageContainer
                key={values?.imageOfOwnershipProof ?? ""}
                imageUrl={imageUrlResolver(values?.imageOfOwnershipProof ?? "")}
                onDelete={() => setFieldValue("imageOfOwnershipProof", "")}
              />
            </ScrollView>
          )}

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
          <ButtonComponent title="Become an Owner" onPress={submitForm} />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddPrivatePlace;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "white",
  },
});
