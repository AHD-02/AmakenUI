import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { IPrivatePlace, IPrivatePlaceResponse, LookUpModel } from "@/app/types";

export const PrivatePlaceApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: "PrivatePlaceApi",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: ["addPrivatePlace"],
  endpoints: (builder) => ({
    privatePlaces: builder.query<Array<IPrivatePlaceResponse>, void>({
      providesTags: ["addPrivatePlace"],
      query: () => ({
        url: "private_Place/SearchPrivatePlaces",
        method: "GET",
      }),
    }),
    getPrivatePlaces: builder.query<IPrivatePlaceResponse, string>({
      providesTags: ["addPrivatePlace"],
      query: (id) => ({
        url: `private_Place/${id}`,
        method: "GET",
      }),
    }),
    privatePlace: builder.mutation<void, IPrivatePlace>({
      invalidatesTags: ["addPrivatePlace"],
      query: (body) => {
        const {availableTo, availableFrom, ...res} = body;
         return ({
        url: `private_Place/create`,
        method: "POST",
        body: {...res, availableTo: "2024-05-30 08:03:39 +00:00", availableFrom: "2024-05-30 06:03:39 +00:00"},
      })},
    }),
    checkNamePrivate: builder.query<boolean, { name: string }>({
      query: (params) => ({
        url: `private_Place/isNameUnique`,
        method: "GET",
        params,
      }),
    }),
    privatePlaceCategories: builder.query<Array<LookUpModel>, void>({
      query: () => ({
        url: "PublicPlacesCategories/getCategories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePrivatePlacesQuery,
  usePrivatePlaceMutation,
  useGetPrivatePlacesQuery,
  useLazyCheckNamePrivateQuery,
  usePrivatePlaceCategoriesQuery,
} = PrivatePlaceApi;
