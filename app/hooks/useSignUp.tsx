import React, { useEffect } from "react";
import { useFormik } from "formik";
import { router } from "expo-router";
import {
  SignUpInitialValues,
  SignUpValidationSchema,
  SignupModel,
} from "../types/user/signup";
import { useSignUpMutation } from "../data/user";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setTokens } from "../state/user/slice";
import { UserModel } from "../types";

const useSignUp = ({userData}: {userData?: UserModel}) => {
  const [signUp, { data, error }] = useSignUpMutation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (error)
      Toast.show({
        type: "error",
        text1: JSON.stringify((error as any)?.data),
      });
  }, [error]);
  const { values, setFieldValue, errors, submitForm } = useFormik({
    //@ts-ignore
    initialValues: SignUpInitialValues(userData),
    validationSchema: SignUpValidationSchema,
    validateOnChange: false,
    onSubmit: (values: SignupModel) => {
      signUp(values)
        .unwrap()
        .then(() => {
          dispatch(
            setTokens({
              accessToken: data?.token,
              refreshToken: "refreshToken",
            })
          );
          router.replace("/(tabs)");
        });
    },
  });
  return { values, setFieldValue, errors, submitForm };
};

export default useSignUp;
