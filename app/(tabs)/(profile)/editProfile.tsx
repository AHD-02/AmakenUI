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
  Image,
} from "native-base";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import PasswordInput from "@/components/sharedComponents/PasswordInput";
import Dropdown from "@/components/sharedComponents/simpleDropdown";
import DatePickerComponent from "@/components/sharedComponents/dateTimePicker";
import useSignUp from "@/app/hooks/useSignUp";
import { useCountriesQuery } from "@/app/data/lookup";
import { colors } from "@/app/theme/Colors";
import { useUserInfo } from "@/app/state/user/hooks";

const EditProfile = () => {
  const userData = useUserInfo()
  const { values, setFieldValue, errors, submitForm } = useSignUp({userData});
  const { data } = useCountriesQuery();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View justifyContent={'center'} flexDirection={'column'}>
        <Image
            source={{
              uri: userData?.images?.[0]
            }}
            alt='User Image'
            width={'100'}
            height={'100'}
            borderRadius={50}
            alignItems={'center'}
          />
        </View>
        <VStack space={"2"}>
          <HStack justifyContent={"space-between"}>
            <Stack width={"45%"}>
              <TextInput
                value={values.firstName}
                label="First Name"
                placeholder={userData.firstName}
                onChangeText={(val: string) => setFieldValue("firstName", val)}
                errorMsg={errors.firstName}
              />
            </Stack>
            <Stack width={"45%"}>
              <TextInput
                value={values.lastName}
                label="Last Name"
                placeholder={userData.lastName}
                onChangeText={(val: string) => setFieldValue("lastName", val)}
                errorMsg={errors.lastName}
              />
            </Stack>
          </HStack>
       
          <Stack>
            <TextInput
              value={values.email}
              label="Email"
              placeholder={userData.email}
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
              placeHolder={userData.country}
              label="Country"
              setSelectedValue={(value) => setFieldValue("country", value)}
              selectedValue={values?.country}
            />
          </Stack>

          <Stack>
            <Dropdown
              items={data ?? []}
              placeHolder={userData.city}
              label="City"
              setSelectedValue={(value) => setFieldValue("city", value)}
              selectedValue={values?.city}
            />
          </Stack>
          <Stack mt={6}>
            <ButtonComponent
              onPress={() => submitForm()}
              title="Edit"
              isEdit
            />
          </Stack>
        </VStack>
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
})
export default EditProfile;
