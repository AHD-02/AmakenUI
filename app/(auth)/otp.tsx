import { SafeAreaView, StyleSheet } from "react-native";
import { Platform, KeyboardAvoidingView } from "react-native";
import { Center, Image, VStack, Text, HStack, Pressable } from "native-base";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import { colors } from "../theme/Colors";
import useLogin from "../hooks/useLogin";
import { Link, router } from "expo-router";
import { SCREENS } from "@/components/screens";


const otp = () => {
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
                        <Image source={LOGO} height={120} width={140} />
                    </Center>
                    <VStack space={6}>
                        <Text style={styles.title}>
                            Confirm Your Email
                        </Text>
                        <Text style={styles.textCode}>
                            We've send you the verification code on 
                        </Text>
                        <Text style={styles.textEmail}>
                            xxxx@amaken.com
                        </Text>
                        <VStack>
                        {/* number of code */}
                          
                        </VStack>
                        <ButtonComponent onPress={() => submitForm()} title="Confirm" />
                    </VStack>
                </VStack>
                <HStack justifyContent={'center'} marginBottom={"16"}>
                    <Text style={styles.reSendCodeText}>Re-send code in <Text>{/*timer*/}</Text> </Text>                </HStack>
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
    reSendCodeText: {
        fontSize: 15,
        fontWeight: "500",
    },
 
    textCode: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: 'left',
        color: colors.grey
    },
    textEmail: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: 'left',
        color: colors.primary
    },
});

export default otp;