import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../middleware";
import { PublicPlaceResponse, RatePlaceModel } from "@/app/types/places";
import { PublicPlaceCreateType } from "@/app/types/publicPlaceType";
import { LookUpModel } from "@/app/types";

export const PublicPlace = createApi({
  baseQuery: customFetchBase,
  reducerPath: "PublicPlace",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  tagTypes: ["place", 'categories'],
  endpoints: (builder) => ({
    searchPublicPlaces: builder.query<PublicPlaceResponse[], void>({
      providesTags: ["place"],
      query: () => ({
        url: "public_Place/Search",
        method: "GET",
      }),
    }),
    getPublicPlace: builder.query<PublicPlaceResponse, string>({
      providesTags: ['place'],
      query: (id) => ({
        url: `public_Place/${id}`,
        method: "GET",
      }),
    }),
    createPublicPlace: builder.mutation<void, PublicPlaceCreateType>({
      invalidatesTags: ["place"],
      query: (body) => ({
        url: `public_Place/create`,
        method: "POST",
        body,
      }),
    }),
    checkName: builder.query<boolean, { name: string }>({
      query: (params) => ({
        url: `public_Place/isNameUnique`,
        method: "GET",
        params
      }),
    }),
    searchPublicPlacesCategories: builder.query<Array<LookUpModel>, void>({
      providesTags: ['categories'],
      query: () => ({
        url: `PublicPlacesCategories/GetCategories`,
        method: 'GET',
      })
    }),
    savePlace: builder.mutation<void, string>({
      invalidatesTags: ['place'],
      query: id => ({
        url: `event/${id ?? ''}/save`,
        method: 'POST',
        body: {}
      })
    }),
    unSavePlace: builder.mutation<void, string>({
      invalidatesTags: ['place'],
      query: id => ({
        url: `event/${id ?? ''}/unSave`,
        method: 'POST',
        body: {}
      })
    }),
    ratePlace: builder.mutation<void, RatePlaceModel>({
      invalidatesTags: ['place'],
      query: (request) => ({
        url: `PlacesRates/${request.id}/rate`,
        method: 'POST',
        body: { score: Number(request.score) }
      })
    })
  }),
});

export const {
  useSearchPublicPlacesQuery,
  useGetPublicPlaceQuery,
  useCreatePublicPlaceMutation,
  useLazyCheckNameQuery,
  useSearchPublicPlacesCategoriesQuery,
  useSavePlaceMutation,
  useUnSavePlaceMutation,
  useRatePlaceMutation,
} = PublicPlace;
