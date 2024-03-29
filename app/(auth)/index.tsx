import { StyleSheet } from "react-native";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { Center, Image, VStack, Text, HStack } from "native-base";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import { colors } from "../theme/Colors";
import useLogin from "../hooks/useLogin";


const Login = () => {
    const {values, setFieldValue, errors, submitForm} = useLogin();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.screenContainer}
            keyboardVerticalOffset={20}
            >
            <View style={styles.body}>
                <VStack space={16}>
                    <Center>
                        <Image source={LOGO} height={160} width={180} />
                    </Center>
                    <VStack space={6}>
                        <Text style={styles.title}>
                            Login
                        </Text>

                        <VStack>
                            <TextInput
                                onChangeText={(value) => setFieldValue('username', value)}
                                value={values.username}
                                label="username"
                                placeholder="username"
                                errorMsg={errors.username}
                            />
                            <TextInput
                                onChangeText={(value) => setFieldValue('password', value)}
                                value={values.password}
                                label="password"
                                placeholder="password"
                                errorMsg={errors.password}
                            />
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </VStack>
                        <ButtonComponent onPress={() => submitForm()} title="Login" />
                    </VStack>
                </VStack>
                <HStack justifyContent={'center'} marginBottom={"16"}>
                    <Text color={colors.black} style={styles.dontHaveAccountText}>Don't have an account? </Text>
                    <Text color={colors.primary} style={styles.dontHaveAccountText}>Sign up</Text>
                </HStack>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        height: '100%',
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? 0 : 25,
    },
    body: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary
    },
    forgotPassword: {
        fontSize: 12,
        fontWeight: "400",
        textAlign: 'right',
        color: colors.grey
    },
    dontHaveAccountText: {
        fontSize: 14,
        fontWeight: "500",
    }
});

export default Login;