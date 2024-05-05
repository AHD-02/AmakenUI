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
  }),
});

export const { useCountriesQuery } = LookUpApi;