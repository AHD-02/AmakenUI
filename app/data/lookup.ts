import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./middleware";
import { LookUpModel } from "../types";

export const LookUpApi = createApi({
  reducerPath: "LookUpApi",
  baseQuery: customFetchBase,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    countries: builder.query<Array<LookUpModel>, void>({
      query: () => ({
        url: "countries",
        method: "GET",
      }),
    }),
    cities: builder.query<Array<LookUpModel>, string>({
      query: (countryId) => ({
        url: `cities/${countryId}`,
        method: "GET",
      }),
    }),
    publicPlaceCategories: builder.query<Array<LookUpModel>, void>({
      query: () => ({
        url: "PublicPlacesCategories/getCategories",
        method: "GET",
      }),
    }),
    privatePlaceCategories: builder.query<Array<LookUpModel>, void>({
      query: () => ({
        url: "privatePlacesCategories/getCategories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCountriesQuery,
  usePublicPlaceCategoriesQuery,
  useLazyCitiesQuery,
  usePrivatePlaceCategoriesQuery,
} = LookUpApi;
