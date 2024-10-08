import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import {
  LoginModel,
  MyPrivatePlacesModel,
  PrivateModel,
  PublicPlaceResponse,
  RefreshToken,
  SearchEventsResponse,
  UserModel,
} from "@/app/types";
import { SignupModel } from "@/app/types/user/signup";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: customFetchBase,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: ['user', 'refreshSaved'],
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
      invalidatesTags: ['user'],
      query: (body) => ({
        url: "user/update",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserModel, void>({
      providesTags: ['user'],
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
    myPlaces: builder.query<Array<PublicPlaceResponse>, void>({
      providesTags: ['refreshSaved'],
      query: () => ({
        url: "user/myPublicPlaces",
        method: "GET",
      }),
    }),
    myPrivatePlaces: builder.query<Array<PrivateModel>, void>({
      query: () => ({
        url: "private_Place/MyPrivatePlaces",
        method: "GET",
      }),
    }),
    myEvents: builder.query<Array<SearchEventsResponse>, void>({
      providesTags: ['refreshSaved'],
      query: () => ({
        url: "user/myAllEvents",
        method: "GET",
      }),
    }),
    enhanceText: builder.mutation<string, string>({
      query: (body) => ({
        url: "openAI/enhanceDescription",
        method: "POST",
        body: { prompt: body },
      }),
    }),
    enhanceImage: builder.mutation<{value: string}, string>({
      query: (body) => ({
        url: "openAI/GenerateImage",
        method: "POST",
        body: { prompt: body },
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
  useMyPlacesQuery,
  useMyEventsQuery,
  useEnhanceTextMutation,
  useMyPrivatePlacesQuery,
  useEnhanceImageMutation,
} = UserApi;
