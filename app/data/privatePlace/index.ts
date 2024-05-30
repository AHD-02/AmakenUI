import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { IPrivatePlace, IPrivatePlaceResponse } from "@/app/types";

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
        url: "private_Place/Search",
        method: "GET",
      }),
    }),
    privatePlace: builder.mutation<void, IPrivatePlace>({
      invalidatesTags: ["addPrivatePlace"],
      query: (body) => ({
        url: `private_Place/create`,
        method: "POST",
        body,
      }),
    }),
    checkNamePrivate: builder.query<boolean, { name: string }>({
      query: (params) => ({
        url: `private_Place/isNameUnique`,
        method: "GET",
        params
      }),
    }),
  }),
});

export const { 
  usePrivatePlacesQuery, 
  usePrivatePlaceMutation,
  useLazyCheckNamePrivateQuery,
} = PrivatePlaceApi;
