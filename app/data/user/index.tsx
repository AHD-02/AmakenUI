import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { LoginModel, RefreshToken, UserModel } from "@/app/types";
import { SignupModel } from "@/app/types/user/signup";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: customFetchBase,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    login: builder.mutation<RefreshToken, LoginModel>({
      query: (body) => ({
        url: "user/SignIn",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<RefreshToken, SignupModel>({
      query: (body) => ({
        url: "user/create",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<void, SignupModel>({
      query: (body) => ({
        url: "user/update",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserModel, void>({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
    }),
    imageUpload: builder.mutation<Array<string>, Array<{ base: string }>>({
      query: (body) => ({
        url: "image/UploadImage",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useImageUploadMutation,
  useUpdateUserMutation,
} = UserApi;
