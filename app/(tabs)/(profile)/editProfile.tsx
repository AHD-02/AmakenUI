import React, { useEffect } from "react";
import {
  ButtonComponent,
  PhoneInput,
  ProfileImageUploader,
  TextInput,
} from "@/components/sharedComponents";
import {
  HStack,
  Stack,
  VStack,
  ScrollView,
  View,
  Image,
  Center,
  Avatar,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import { useCountriesQuery, useLazyCitiesQuery } from "@/app/data/lookup";
import { colors } from "@/app/theme/Colors";
import { useUserInfo } from "@/app/state/user/hooks";
import { imageUrlResolver } from "@/app/utils/imageUtils";
import { CameraIcon } from "@/assets/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import {
  SignUpInitialValues,
  SignupModel,
  SignUpValidationSchema,
} from "@/app/types/user/signup";
import { useUpdateUserMutation } from "@/app/data/user";
import Toast from "react-native-toast-message";
import { getFirstChars } from "@/app/utils/globalUtils";

const EditProfile = () => {
  const userData = useUserInfo();
  const [updateUser, res] = useUpdateUserMutation();
  const { data, error } = res;
  const { data: countries } = useCountriesQuery();
  const [getCity, { data: cities }] = useLazyCitiesQuery();

  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: SignUpInitialValues(userData),
    validationSchema: SignUpValidationSchema(true),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values: SignupModel) => {
      const { password, confirmPassword, ...res } = values;
      await updateUser(res as SignupModel);
    },
  });

  useEffect(() => {
    if (values.country) {
      getCity(values?.country);
    }
  }, [values?.country]);

  useEffect(() => {
    if (data || error)
      Toast.show({
        type: "info",
        text1: JSON.stringify(data ?? (error as any)?.data),
      });
  }, [data, error]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardContainer}
      enableOnAndroid
      extraScrollHeight={20}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View justifyContent={"center"} flexDirection={"column"}>
          <Center padding={8}>
            <View>
              <ProfileImageUploader
                image={values.images?.[0] ?? ""}
                setImage={(image) => setFieldValue("images", image)}
              />
            </View>
          </Center>
        </View>
        <VStack space={"2"}>
          <HStack justifyContent={"space-between"}>
            <Stack width={"45%"}>
              <TextInput
                value={values.firstName}
                label="First Name"
                placeholder={"First name"}
                onChangeText={(val: string) => setFieldValue("firstName", val)}
                errorMsg={errors.firstName}
              />
            </Stack>
            <Stack width={"45%"}>
              <TextInput
                value={values.lastName}
                label="Last Name"
                placeholder={"Last name"}
                onChangeText={(val: string) => setFieldValue("lastName", val)}
                errorMsg={errors.lastName}
              />
            </Stack>
          </HStack>

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
              countryCode={values.countryCode ?? "JO"}
            />
          </Stack>

          <Stack>
            <Dropdown
              items={countries}
              placeHolder={"Select country"}
              label="Country"
              setSelectedValue={(value) => setFieldValue("country", value)}
              selectedValue={values?.country}
            />
          </Stack>

          <Stack>
            <Dropdown
              items={cities ?? []}
              placeHolder={"Select City"}
              label="City"
              setSelectedValue={(value) => setFieldValue("city", value)}
              selectedValue={values?.city}
            />
          </Stack>
          <Stack mt={6}>
            <ButtonComponent
              onPress={() => submitForm()}
              title="Edit"
              backgroundColor="#27AE60"
            />
          </Stack>
        </VStack>
      </ScrollView>
    </KeyboardAwareScrollView>
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
  icon: {
    position: "absolute",
    right: 197,
    top: 47,
    height: 0,
    width: 0,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardContainer: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: "white",
  },
});

export default EditProfile;
