import { SafeAreaView, StyleSheet } from "react-native";
import { Platform, KeyboardAvoidingView } from "react-native";
import { Center, Image, VStack, Text, HStack, Pressable } from "native-base";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import { colors } from "../theme/Colors";
import useLogin from "../hooks/useLogin";
import { Link, router } from "expo-router";
import { SCREENS } from "@/components/screens";


const forgetPassword = () => {
    const {values, setFieldValue, errors, submitForm} = useLogin();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.screenContainer}
            keyboardVerticalOffset={20}
            >
            <SafeAreaView style={styles.body}>
                <VStack space={16}>
                    <Center>
                        <Image source={LOGO} height={160} width={180} />
                    </Center>
                    <VStack space={6}>
                        <Text style={styles.title}>
                            Forget Password!
                        </Text>

                        <VStack>
                          {/* Email */}
                            <TextInput
                                onChangeText={(value) => setFieldValue('email', value)}
                                value={values.email}
                                label="email"
                                placeholder="email"
                                errorMsg={errors.email}
                            />
                          
                        </VStack>
                        {/* OTP Page */}
                        <ButtonComponent onPress={() => submitForm()} title="Send OTP" />
                    </VStack>
                </VStack>
                <HStack justifyContent={'center'} marginBottom={"16"}>
                    <Text style={styles.rememberPasswordText}>Remember Password? </Text>
                    <Link push href={`/`} style={styles.loginText}>Login</Link>
                </HStack>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        height: '100%',
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? 0 : 40,
        backgroundColor:'white'
    },
    body: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black'
    },
    rememberPasswordText: {
        fontSize: 14,
        fontWeight: "500",
    },
    loginText: {
        fontSize: 14,
        fontWeight: "500",
        alignSelf: 'center',
        color: colors.primary
    },
});

export default forgetPassword;