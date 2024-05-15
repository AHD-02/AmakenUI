import { createApi } from '@reduxjs/toolkit/query/react';
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
        searchSavedEvents: builder.query<SearchEventsResponse[], void>({
            query: () => ({
                url: 'event/searchSavedEvents',
                method: 'GET',
            }),
        }),
        getEvent: builder.query<SearchEventsResponse, string>({
            query: id => ({
                url: `event/${id}`,
                method: 'GET',
            }),
        }),
        createEvent: builder.mutation<void, SearchEventsResponse>({
            query: body => ({
                url: 'event/createEvent',
                method: 'POST',
                body: body
            })
        })
    }),
});

export const {
    useSearchEventsQuery,
    useSearchSavedEventsQuery,
    useGetEventQuery,
    useCreateEventMutation,
} = EventApi;
