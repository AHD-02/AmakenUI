import React from "react";
import { useFormik } from "formik";
import { router } from "expo-router";
import {
  SignUpInitialValues,
  SignUpValidationSchema,
  SignupModel,
} from "../types/user/signup";
import { useSignUpMutation } from "../data/user";

const useSignUp = () => {
  const [signUp] = useSignUpMutation();
  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: SignUpInitialValues,
    validationSchema: SignUpValidationSchema,
    validateOnChange: false,
    onSubmit: (values: SignupModel) => {
      signUp(values)
        .unwrap()
        .then(() => {
          router.replace("/(tabs)");
        });
    },
  });
  return { values, setFieldValue, errors, submitForm };
};

export default useSignUp;
