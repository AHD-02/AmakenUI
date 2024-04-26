import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import { PublicPlaceResponse } from '@/app/types/places';

export const PublicPlace = createApi({
    reducerPath: 'PublicPlace',
    baseQuery: customFetchBase,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: builder => ({
        searchPublicPlaces: builder.query<PublicPlaceResponse[], void>({
            query: () => ({
                url: 'publicPlace/SearchPublicPlaces',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useSearchPublicPlacesQuery,
} = PublicPlace;
