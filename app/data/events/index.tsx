import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import { SearchEventsResponse } from '@/app/types';

export const EventApi = createApi({
    reducerPath: 'EventApi',
    baseQuery: customFetchBase,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: builder => ({
        searchEvents: builder.query<SearchEventsResponse[], void>({
            query: () => ({
                url: 'event/SearchEvents',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useSearchEventsQuery,
} = EventApi;
