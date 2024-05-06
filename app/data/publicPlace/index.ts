import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { PublicPlaceResponse } from "@/app/types/places";

export const PublicPlace = createApi({
  baseQuery: customFetchBase,
  reducerPath: "PublicPlace",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    searchPublicPlaces: builder.query<PublicPlaceResponse[], void>({
      query: () => ({
        url: "public_Place/SearchPublicPlaces",
        method: "GET",
      }),
    }),
    getPublicPlace: builder.query<PublicPlaceResponse, string>({
      query: (id) => ({
        url: `public_Place/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchPublicPlacesQuery, useGetPublicPlaceQuery } = PublicPlace;
