import React, { useEffect } from "react";
import { useFormik } from "formik";
import { router } from "expo-router";
import {
  SignUpInitialValues,
  SignUpValidationSchema,
  SignupModel,
} from "../types/user/signup";
import { useLazyGetUserQuery, useSignUpMutation } from "../data/user";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setSignUpState, setTokens, setUser } from "../state/user/slice";
import { SCREENS } from "@/components/screens";
import { setIsLoading } from "../state/app/slice";

const useSignUp = () => {
  const [signUp, { data, error }] = useSignUpMutation();
  const dispatch = useDispatch();
  const [getUser, userRes] = useLazyGetUserQuery();
  const { data: userData, isLoading } = userRes;

  useEffect(() => {
    dispatch(setIsLoading(isLoading ?? false));
    if (data) {
      dispatch(
        setTokens({
          accessToken: data.token,
        })
      );
      getUser();
    }

    if (error) {
      Toast.show({
        type: "error",
        text1: "error",
        text2: JSON.stringify((error as any).data ?? ""),
      });
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
      router.replace(`/${SCREENS.Main}/`);
    }
  }, [userData]);

  const { values, setFieldValue, errors, submitForm } = useFormik({
    //@ts-ignore
    initialValues: SignUpInitialValues(userData),
    validationSchema: SignUpValidationSchema,
    validateOnChange: false,
    onSubmit: async (values: SignupModel) => {
      if (values.intrests && values.intrests?.length > 0)
        await signUp(values)
      else {
        dispatch(setSignUpState(values as any))
        router.push(`/${SCREENS.Auth}/${SCREENS.Categories}`);
      }
    },
  });
  return { values, setFieldValue, errors, submitForm };
};

export default useSignUp;
