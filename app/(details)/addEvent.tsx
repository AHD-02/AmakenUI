import { View, VStack, KeyboardAvoidingView, ScrollView, HStack } from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import { EventsInitialValues, EventsValidationSchema, PublicPlaceResponse, SearchEventsResponse } from "../types";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";
import { useCreateEventMutation } from "../data/events";
import { useFormik } from "formik";
import { usePickImage, useUploadImage } from "../hooks";

const AddEvent = () => {
    const [createEvent] = useCreateEventMutation()
    const { values, setFieldValue, handleSubmit, errors } = useFormik({
        initialValues: EventsInitialValues,
        validationSchema: EventsValidationSchema,
        validateOnChange: false,
        onSubmit: (values: SearchEventsResponse) => {

        }
    })
    const { upload, images, isLoading } = useUploadImage();

    const handleUploadImage = async () => {
      const image = await usePickImage();
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

    const { data: publicPlaces } = useSearchPublicPlacesQuery()
    const publicPlacesItems = useMemo(() => publicPlaces?.map((item: PublicPlaceResponse) => (
        { label: item.name ?? '', value: item.publicPlaceId ?? '' }
    )) ?? [], [publicPlaces])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack flex={1} paddingY={3} space={"2"}>
                    <UploadPhotos onPress={handleUploadImage} />
                    <View>
                        <Dropdown label="Public Place" items={publicPlacesItems} placeHolder="select" />
                    </View>

                    <View>
                        <TextInput
                            onChangeText={(val: string) => setFieldValue('name', val)}
                            value={values.name ?? ''}
                            label="Event Name"
                            placeholder="name"
                            errorMsg={errors.name}
                        />
                    </View>

                    <HStack justifyContent={'space-between'}>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={values.eventStart?.toString() ?? ''}
                                setValue={(val) => setFieldValue('eventStart', new Date(val ?? ''))}
                                label="Date"
                            />
                        </View>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={''}
                                setValue={(val) => setFieldValue('endDate', val)}
                                label="Time"
                                placeholder="00:00"
                            />
                        </View>
                    </HStack>
                    <View>
                        <TextInput
                            onChangeText={(val: string) => setFieldValue('fees', +val ?? 0)}
                            value={values.fees?.toString() ?? 0}
                            label="Fees"
                            placeholder="0 JOD"
                            keyboardType="numeric"
                            errorMsg={errors.fees}
                        />
                    </View>

                    <View>
                        <TextInput
                            onChangeText={(val: string) => setFieldValue('description', val)}
                            value={values.description ?? ''}
                            label="Decription"
                            placeholder="description"
                            errorMsg={errors.description}
                        />
                    </View>
                </VStack>

                <View alignItems={"flex-end"} marginTop={140}>
                    <ButtonComponent title="Create Event" onPress={handleSubmit} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddEvent;

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