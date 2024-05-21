import React, { useEffect } from "react";
import { useFormik } from "formik";
import { router, usePathname } from "expo-router";
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
import { UserInitialValues } from "../types";
import { useTypedSelector } from "../state/store";

const useSignUp = () => {
  const [signUp, res] = useSignUpMutation();
  const dispatch = useDispatch();
  const [getUser, userRes] = useLazyGetUserQuery();
  const { data: userData, isLoading } = userRes;

  const pathname = usePathname()
  const { data, error } = res
  const signUpState = useTypedSelector(state => state.user.signupState)

  useEffect(() => {
    dispatch(setIsLoading(isLoading ?? false));
    if (data) {
      dispatch(
        setTokens({
          accessToken: data.token,
        })
      );
      dispatch(
        setSignUpState(UserInitialValues)
      )
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
    initialValues: SignUpInitialValues(signUpState),
    validationSchema: SignUpValidationSchema(pathname.includes(SCREENS.Categories)),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values: SignupModel) => {
      if (pathname.includes(SCREENS.Signup)) {
        dispatch(setSignUpState(values as any))
        router.push(`/${SCREENS.Auth}/${SCREENS.Categories}`);
      } else if (pathname.includes(SCREENS.Categories)) {
        if (values.intrests && values.intrests?.length >= 3)
          await signUp(values)
        else
          Toast.show({
            type: 'error',
            text1: 'Select Three At Lease'
          })
      }
    },
  });

  return { values, setFieldValue, errors, submitForm };
};

export default useSignUp;
