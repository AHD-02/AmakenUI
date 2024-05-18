import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { PublicPlaceResponse } from "@/app/types/places";
import { PublicPlaceCreateType } from "@/app/types/publicPlaceType";

export const PublicPlace = createApi({
  baseQuery: customFetchBase,
  reducerPath: "PublicPlace",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: ["addPlace"],
  endpoints: (builder) => ({
    searchPublicPlaces: builder.query<PublicPlaceResponse[], void>({
      providesTags: ["addPlace"],
      query: () => ({
        url: "public_Place/Search",
        method: "GET",
      }),
    }),
    getPublicPlace: builder.query<PublicPlaceResponse, string>({
      query: (id) => ({
        url: `public_Place/${id}`,
        method: "GET",
      }),
    }),
    createPublicPlace: builder.mutation<void, PublicPlaceCreateType>({
      invalidatesTags: ["addPlace"],
      query: (body) => ({
        url: `public_Place/create`,
        method: "POST",
        body,
      }),
    }),
    checkName: builder.query<boolean, {name: string}>({
      query: (params) => ({
        url: `public_Place/isNameUnique`,
        method: "GET",
        params
      }),
    }),
  }),
});

export const {
  useSearchPublicPlacesQuery,
  useGetPublicPlaceQuery,
  useCreatePublicPlaceMutation,
  useLazyCheckNameQuery,
} = PublicPlace;
