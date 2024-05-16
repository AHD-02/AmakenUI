import {
    View,
    VStack,
    KeyboardAvoidingView,
    ScrollView,
    HStack,
} from "native-base";
import UploadPhotos from "./components/uploadPhotos";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import {
    ButtonComponent,
    ImageContainer,
    TextInput,
    WarningMessage,
} from "@/components/sharedComponents";
import { StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import { useSearchPublicPlacesQuery } from "../data/publicPlace";
import {
    EventsInitialValues,
    EventsValidationSchema,
    PublicPlaceResponse,
    SearchEventsResponse,
} from "../types";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";
import { useCreateEventMutation } from "../data/events";
import { useFormik } from "formik";
import { usePickImage, useUploadImage } from "../hooks";

const AddEvent = () => {
    const [createEvent] = useCreateEventMutation();
    const { values, setFieldValue, handleSubmit, errors } = useFormik({
        initialValues: EventsInitialValues,
        validationSchema: EventsValidationSchema,
        validateOnChange: false,
        onSubmit: (values: SearchEventsResponse) => { },
    });
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

    const { data: publicPlaces } = useSearchPublicPlacesQuery();
    const publicPlacesItems = useMemo(
        () =>
            publicPlaces?.map((item: PublicPlaceResponse) => ({
                label: item.name ?? "",
                value: item.publicPlaceId ?? "",
            })) ?? [],
        [publicPlaces]
    );

    const [startDate, setStartDate] = useState<{ date: Date, time: Date }>({
        date: new Date(),
        time: new Date()
    })
    const [endDate, setEndDate] = useState<{ date: Date, time: Date }>({
        date: new Date(),
        time: new Date()
    })
    const handleStartDate = () => {
        setFieldValue('eventStart', new Date(
            startDate.date.getFullYear(),
            startDate.date.getMonth(),
            startDate.date.getDate(),
            startDate.time.getHours(),
            startDate.time.getMinutes()
        ))
    }
    const handleEndDate = () => {
        setFieldValue('eventStart', new Date(
            endDate.date.getFullYear(),
            endDate.date.getMonth(),
            endDate.date.getDate(),
            endDate.time.getHours(),
            endDate.time.getMinutes()
        ))
    }
    console.log('startDate', startDate)
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack flex={1} paddingY={3} space={"2"}>
                    <UploadPhotos onPress={handleUploadImage} />

                    {Boolean(errors.images) && (
                        <WarningMessage
                            title={errors.images?.[0] ?? ""}
                            stylingBox={{ marginTop: 2, marginBottom: 8 }}
                        />
                    )}

                    {Array.isArray(values?.images) && !isLoading && (
                        <ScrollView horizontal paddingBottom={2}>
                            {values.images.map((img) => (
                                <ImageContainer key={img ?? ""} imageUrl={`https://${img}`} />
                            ))}
                        </ScrollView>
                    )}

                    <View>
                        <Dropdown
                            label="Public Place"
                            items={publicPlacesItems}
                            placeHolder="select"
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

                    <HStack justifyContent={'space-between'}>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={values.eventStart?.toString() ?? ''}
                                setValue={(val) => {
                                    setStartDate(prev => ({ ...prev, date: new Date(val) }))
                                    handleStartDate()
                                }}
                                label="Start Date"
                            />
                        </View>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={startDate.time?.toString()}
                                setValue={(val) => setStartDate(prev => ({ ...prev, time: new Date(val) }))}
                                label="Start Time"
                                placeholder="00:00"
                                mode="time"
                            />
                        </View>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={endDate.date.toString() ?? ''}
                                setValue={(val) => {
                                    setEndDate(prev => ({ ...prev, date: new Date(val) }))
                                    handleEndDate()
                                }}
                                label="End Date"
                            />
                        </View>
                        <View width={'46%'}>
                            <DatePickerComponent
                                value={endDate.time?.toString()}
                                setValue={(val) => {
                                    setEndDate(prev => ({ ...prev, time: new Date(val) }))
                                    handleEndDate()
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
                            onChangeText={(val: string) => setFieldValue("description", val)}
                            value={values.description ?? ""}
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
