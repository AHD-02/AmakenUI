import { View, VStack, ScrollView, HStack } from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
  ButtonComponent,
  ImageContainer,
  TextInput,
  WarningMessage,
} from "@/components/sharedComponents";
import { StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import {
  EventsInitialValues,
  EventsValidationSchema,
  PublicPlaceResponse,
  SearchEventsResponse,
} from "../types";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";
import {
  useCreateEventMutation,
  useSearchEventsCategoriesQuery,
} from "../data/events";
import { useFormik } from "formik";
import { usePickImage, useUploadImage } from "../hooks";
import { imageUrlResolver } from "../utils/imageUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddEvent = () => {
  const [createEvent, res] = useCreateEventMutation();
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: EventsInitialValues,
    validationSchema: EventsValidationSchema,
    validateOnChange: false,
    onSubmit: (values: SearchEventsResponse) => {
      createEvent(values);
    },
  });
  const { upload, images, isLoading } = useUploadImage();

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

  const { data: categories } = useSearchEventsCategoriesQuery();
  const { data: publicPlaces } = useSearchPublicPlacesQuery();
  const publicPlacesItems = useMemo(
    () =>
      publicPlaces?.map((item: PublicPlaceResponse) => ({
        label: item.name ?? "",
        value: item.publicPlaceId ?? "",
      })) ?? [],
    [publicPlaces]
  );

  const [startDate, setStartDate] = useState<{ date: Date; time: Date }>({
    date: new Date(),
    time: new Date(),
  });
  const [endDate, setEndDate] = useState<{ date: Date; time: Date }>({
    date: new Date(),
    time: new Date(),
  });
  const handleStartDate = () => {
    // TODO: FIX THE LOGIC
    setFieldValue(
      "eventStart",
      new Date(
        startDate.date.getFullYear(),
        startDate.date.getMonth(),
        startDate.date.getDate(),
        startDate.time.getHours(),
        startDate.time.getMinutes()
      )
    );
  };
  const handleEndDate = () => {
    // TODO: FIX THE LOGIC
    setFieldValue(
      "eventEnd",
      new Date(
        endDate.date.getFullYear(),
        endDate.date.getMonth(),
        endDate.date.getDate(),
        endDate.time.getHours(),
        endDate.time.getMinutes()
      )
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardContainer}
      enableOnAndroid
      extraScrollHeight={20}
    >
      <View style={styles.container}>
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
                  />
                ))}
              </ScrollView>
            )}

            <View>
              <Dropdown
                label="Public Place"
                items={publicPlacesItems}
                placeHolder="select"
                setSelectedValue={(val) => setFieldValue("placeID", val)}
                errorMsg={errors.placeID}
              />
            </View>

            <View>
              <Dropdown
                label="Event Type"
                items={categories ?? []}
                placeHolder="select"
                setSelectedValue={(val) => setFieldValue("eventType", val)}
                errorMsg={errors.eventType}
              />
            </View>

            <View>
              <TextInput
                onChangeText={(val: string) => setFieldValue("name", val)}
                value={values.name ?? ""}
                label="Event Name"
                placeholder="name"
                errorMsg={errors.name}
              />
            </View>

            <HStack justifyContent={"space-between"}>
              <View width={"46%"}>
                <DatePickerComponent
                  value={
                    values.eventStart ? startDate.date?.toString() ?? "" : ""
                  }
                  setValue={(val) => {
                    setStartDate((prev) => ({ ...prev, date: new Date(val) }));
                    handleStartDate();
                  }}
                  label="Start Date"
                />
              </View>
              <View width={"46%"}>
                <DatePickerComponent
                  value={values.eventStart ? startDate.time?.toString() : ""}
                  setValue={(val) =>
                    setStartDate((prev) => ({ ...prev, time: new Date(val) }))
                  }
                  label="Start Time"
                  placeholder="00:00"
                  mode="time"
                />
              </View>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <View width={"46%"}>
                <DatePickerComponent
                  value={values.eventEnd ? endDate.date.toString() ?? "" : ""}
                  setValue={(val) => {
                    setEndDate((prev) => ({ ...prev, date: new Date(val) }));
                    handleEndDate();
                  }}
                  label="End Date"
                />
              </View>
              <View width={"46%"}>
                <DatePickerComponent
                  value={values.eventEnd ? endDate.time?.toString() : ""}
                  setValue={(val) => {
                    setEndDate((prev) => ({ ...prev, time: new Date(val) }));
                    handleEndDate();
                  }}
                  label="End Time"
                  placeholder="00:00"
                  mode="time"
                />
              </View>
            </HStack>
            <View>
              <TextInput
                onChangeText={(val: string) => setFieldValue("fees", +val ?? 0)}
                value={values.fees?.toString() ?? 0}
                label="Fees"
                placeholder="0 JOD"
                keyboardType="numeric"
                errorMsg={errors.fees}
              />
            </View>

            <View>
              <TextInput
                onChangeText={(val: string) =>
                  setFieldValue("description", val)
                }
                value={values.description ?? ""}
                label="Decription"
                placeholder="description"
                errorMsg={errors.description}
              />
            </View>
          </VStack>

          <View alignItems={"flex-end"} marginTop={"16"}>
            <ButtonComponent title="Create Event" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 25,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingBottom: 12,
  },
  keyboardContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
