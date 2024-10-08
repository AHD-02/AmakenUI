import { SafeAreaView, StyleSheet } from "react-native";
import { Platform } from "react-native";
import {
  Center,
  Image,
  VStack,
  Text,
  HStack,
  Pressable,
  View,
} from "native-base";
import { ButtonComponent, TextInput } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import { colors } from "../theme/Colors";
import useLogin from "../hooks/useLogin";
import { Link, router } from "expo-router";
import { SCREENS } from "@/components/screens";
import PasswordInput from "@/components/sharedComponents/PasswordInput";

const Login = () => {
  const { values, setFieldValue, errors, submitForm, hiddenLogin } = useLogin();

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.body}>
        <VStack space={16}>
          <Pressable onPress={hiddenLogin}>
            <Center>
              <Image source={LOGO} height={160} width={180} />
            </Center>
          </Pressable>
          <VStack space={6}>
            <Text style={styles.title}>Login</Text>

            <VStack>
              <TextInput
                onChangeText={(value) => setFieldValue("email", value?.trim())}
                value={values.email}
                label="email"
                placeholder="email"
                errorMsg={errors.email}
              />
              <PasswordInput
                onChangeText={(value) => setFieldValue("password", value)}
                value={values.password}
                label="password"
                placeholder="password"
                errorMsg={errors.password}
              />
              <Pressable
                onPress={() => router.push(`/${SCREENS.ForgotPassword}`)}
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </VStack>
            <ButtonComponent onPress={() => submitForm()} title="Login" />
          </VStack>
        </VStack>
        <VStack marginBottom={"16"} space={2}>
          <HStack justifyContent={"center"}>
            <Text style={styles.dontHaveAccountText}>
              Don't have an account?
            </Text>
            <Link push href={`/${SCREENS.Signup}`} style={styles.signupText}>
              Sign up
            </Link>
          </HStack>
          <HStack justifyContent={"center"}>
            <Text style={styles.dontHaveAccountText}>Contenue as a </Text>
            <Link push href={`(tabs)/`} style={styles.signupText}>
              Guest
            </Link>
          </HStack>
        </VStack>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
    padding: 25,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
    backgroundColor: "white",
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "right",
    color: colors.grey,
  },
  dontHaveAccountText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  signupText: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
    color: colors.primary,
  },
});

export default Login;
