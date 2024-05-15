import { SafeAreaView, StyleSheet } from "react-native";
import { Platform, KeyboardAvoidingView } from "react-native";
import { Center, Image, VStack, Text, HStack, Pressable } from "native-base";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import { colors } from "../theme/Colors";
import useLogin from "../hooks/useLogin";
import { Link, router } from "expo-router";
import { SCREENS } from "@/components/screens";
import PasswordInput from "@/components/sharedComponents/PasswordInput";
import useSignUp from "../hooks/useSignUp";


const setNewPassword = () => {
    const {values, setFieldValue, errors, submitForm} = useSignUp({});

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
                            Set New Password
                        </Text>

                        <VStack>
                        <PasswordInput
                                onChangeText={(value) => setFieldValue('password', value)}
                                value={values.password}
                                label="New Password"
                                placeholder="password"
                                errorMsg={errors.password}

                            />
                            <PasswordInput
                                onChangeText={(value) => setFieldValue('password', value)}
                                value={values.password}
                                label="Confirm New Password"
                                placeholder="Confirm New Password"
                                errorMsg={errors.password}

                            />
                         
                        </VStack>
                        <ButtonComponent onPress={() => submitForm()} title="Confirm" />
                    </VStack>
                </VStack>
                
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
    
});

export default setNewPassword;