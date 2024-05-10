import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoginModel } from "../types";
import { router } from "expo-router";
import { useLazyGetUserQuery, useLoginMutation } from "../data/user";
import { useAppDispatch } from "../state/store";
import { setIsLoading } from "../state/app/slice";
import { setTokens, setUser } from "../state/user/slice";
import { SCREENS } from "@/components/screens";
import Toast from "react-native-toast-message";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, res] = useLoginMutation();
  const [getUser, userRes] = useLazyGetUserQuery();
  const { data: userData } = userRes;

  const { data, error, isLoading, isSuccess, isError } = res;

  const { values, setFieldValue, errors, submitForm } = useFormik({
    validationSchema: yup.object({
      email: yup
        .string()
        .email("please enter a valid email address")
        .required("required"),
      password: yup.string().required("required"),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: LoginModel) => {
      await login(values);
    },
  });

  useEffect(() => {
    dispatch(setIsLoading(isLoading ?? false));
    if (data) {
      dispatch(
        setTokens({
          accessToken: data.token,
          refreshToken: data.refreshToken,
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

  const hiddenLogin = async () => {
    await login({email: 'bashar@mail.com', password: 'password'})
  }

  return { values, setFieldValue, errors, submitForm, isSuccess, isError, hiddenLogin };
};

export default useLogin;
