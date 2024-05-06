import React from "react";
import {
  ButtonComponent,
  PhoneInput,
  ProfileImageUploader,
  TextInput,
} from "@/components/sharedComponents";
import {
  KeyboardAvoidingView,
  Text,
  HStack,
  Stack,
  VStack,
  ScrollView,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import useSignUp from "../hooks/useSignUp";
import { Link } from "expo-router";
import { colors } from "../theme/Colors";
import PasswordInput from "@/components/sharedComponents/PasswordInput";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import { useCountriesQuery } from "../data/lookup";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";

const UserSignUp = () => {
  const { values, setFieldValue, errors, submitForm } = useSignUp();
  const { data } = useCountriesQuery();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ProfileImageUploader
            image={values.images}
            setImage={(date) => setFieldValue("images", date)}
          />
        </View>
        <VStack space={"2"}>
          <HStack justifyContent={"space-between"}>
            <Stack width={"45%"}>
              <TextInput
                value={values.firstName}
                label="First Name"
                placeholder="first name"
                onChangeText={(val: string) => setFieldValue("firstName", val)}
                errorMsg={errors.firstName}
              />
            </Stack>
            <Stack width={"45%"}>
              <TextInput
                value={values.lastName}
                label="Last Name"
                placeholder="last name"
                onChangeText={(val: string) => setFieldValue("lastName", val)}
                errorMsg={errors.lastName}
              />
            </Stack>
          </HStack>
          {/* <Stack>
            <DatePickerComponent
              label="Date Of Birth"
              setValue={(val: string) => setFieldValue("date", val)}
              value={values?.date?.toString() ?? ""}
            />
          </Stack> */}
          <Stack>
            <TextInput
              value={values.email}
              label="Email"
              placeholder="email"
              onChangeText={(val: string) => setFieldValue("email", val)}
              errorMsg={errors.email}
            />
          </Stack>
          <Stack>
            <PhoneInput
              label="Phone Number"
              showErrorMsg={false}
              errorMsg={errors.phone}
              setMobileNumber={(value: string) => setFieldValue("phone", value)}
              mobileNumber={values.phone}
              setCountryCode={(value: any) =>
                setFieldValue("countryCode", value)
              }
              countryCode={values.countryCode}
            />
          </Stack>

          <Stack>
            <Dropdown
              items={data}
              placeHolder="Select Country"
              label="Country"
              setSelectedValue={(value) => setFieldValue("country", value)}
              selectedValue={values?.country}
            />
          </Stack>

          <Stack>
            <Dropdown
              items={data ?? []}
              placeHolder="Select City"
              label="City"
              setSelectedValue={(value) => setFieldValue("city", value)}
              selectedValue={values?.city}
            />
          </Stack>

          <PasswordInput
            onChangeText={(value) => setFieldValue("password", value)}
            value={values.password}
            label="Password"
            placeholder="password"
            errorMsg={errors.password}
          />
          <PasswordInput
            onChangeText={(value) => setFieldValue("confirmPassword", value)}
            value={values.confirmPassword}
            label="ConfirmPassword"
            placeholder="password"
            errorMsg={errors.confirmPassword}
          />
          <Stack mt={6}>
            <ButtonComponent
              onPress={() => submitForm()}
              title="Create New Account"
            />
          </Stack>
        </VStack>
        <HStack justifyContent={"center"} marginTop={"16"}>
          <Text color={colors.black} style={styles.haveAnAccountText}>
            Have an account?{" "}
          </Text>
          <Link push href={`/`} style={styles.signinText}>
            Signin
          </Link>
        </HStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 25,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
  haveAnAccountText: {
    fontSize: 14,
    fontWeight: "500",
  },
  signinText: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
    color: colors.primary,
  },
});
export default UserSignUp;
