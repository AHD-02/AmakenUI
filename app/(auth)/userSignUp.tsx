import { Camera } from "@/assets/images";
import { ButtonComponent, PhoneInput, TextInput } from "@/components/sharedComponents";
import DateTimePicker from "@/components/sharedComponents/dateTimePicker";
import { KeyboardAvoidingView, Image, Text, HStack, Stack, View, Center, VStack, Pressable, ScrollView } from "native-base";
import { StyleSheet } from "react-native"
import useSignUp from "../hooks/useSignUp";
import { useState } from "react";
import { ArrowDownIcon } from "@/assets/icons";
import { Link } from "expo-router";
import { colors } from "../theme/Colors";
import { useTakeImage } from "../hooks";


const UserSignUp = () => {
    const { values, setFieldValue, errors, submitForm } = useSignUp()
    const [modal, setModal] = useState<'country' | 'city' | null>(null)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={() => useTakeImage()}>
                <Center>
                    <Image source={Camera} height={120} width={120} my={"6"} />
                </Center>
                </Pressable>
                <VStack space={"2"}>
                    <HStack justifyContent={'space-between'}>
                        <Stack width={'45%'}>
                            <TextInput
                                value={values.firstName}
                                label="First Name"
                                onChangeText={(val: string) => setFieldValue('firstName', val)}
                                errorMsg={errors.firstName}
                            />
                        </Stack>
                        <Stack width={'45%'}>
                            <TextInput
                                value={values.lastName}
                                label="Last Name"
                                onChangeText={(val: string) => setFieldValue('lastName', val)}
                                errorMsg={errors.lastName}
                            />
                        </Stack>
                    </HStack>
                    <Stack>
                        <TextInput
                            value={values.email}
                            label="Email"
                            onChangeText={(val: string) => setFieldValue('email', val)}
                            errorMsg={errors.email}
                        />
                    </Stack>
                    <Stack>
                        <PhoneInput
                            showErrorMsg={false}
                            errorMsg={errors.phoneNumber}
                            setMobileNumber={(value: string) => setFieldValue('phoneNumber', value)}
                            mobileNumber={values.phoneNumber}
                            setCountryCode={(value: any) => setFieldValue('countryCode', value)}
                            countryCode={values.countryCode}
                        />
                    </Stack>
                    <Stack>
                        {/* <DateTimePicker
                            date={values.date ?? new Date()}
                            setDate={(date: Date) => setFieldValue('date', date)}
                            placeHolder='DD/MM/YYYY'
                            label='Date Of Birth'
                            errorMsg={errors.date}
                        /> */}
                    </Stack>
                    <Stack>
                        <Pressable onPress={() => setModal('country')}>
                            <TextInput
                                value={values.country}
                                editable={false}
                                onChangeText={(val: string) => setFieldValue('country', val)}
                                placeholder={'country'}
                                label={'Country'}
                                rightIcon={<ArrowDownIcon />}
                                errorMsg={errors.country}
                            />
                        </Pressable>
                    </Stack>
                    <Stack>
                        <Pressable onPress={() => setModal('city')}>
                            <TextInput
                                value={values.city}
                                editable={false}
                                onChangeText={(val: string) => setFieldValue('city', val)}
                                placeholder={'city'}
                                label={'city'}
                                rightIcon={<ArrowDownIcon />}
                                errorMsg={errors.city}
                            />
                        </Pressable>
                    </Stack>
                    <Stack mt={6}>
                        <ButtonComponent onPress={() => submitForm()} title="Create New Account"/>
                    </Stack>
                </VStack>
                <HStack justifyContent={'center'} marginTop={"16"}>
                    <Text color={colors.black} style={styles.haveAnAccountText}>Have an account? </Text>
                    <Link push href={`/`} style={styles.signinText}>Signin</Link>
                </HStack>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 25,
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    haveAnAccountText: {
        fontSize: 14,
        fontWeight: "500",
    },
    signinText: {
        fontSize: 14,
        fontWeight: "500",
        alignSelf: 'center',
        color: colors.primary
    },
})
export default UserSignUp;