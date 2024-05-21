import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import { LookUpModel, SearchEventsResponse } from '@/app/types';

export const EventApi = createApi({
    reducerPath: 'EventApi',
    baseQuery: customFetchBase,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    tagTypes: ['event', 'categories'],
    endpoints: builder => ({
        searchEvents: builder.query<SearchEventsResponse[], void>({
            providesTags: ['event'],
            query: () => ({
                url: 'event/SearchEvents',
                method: 'GET',
            }),
        }),
        searchSavedEvents: builder.query<SearchEventsResponse[], void>({
            providesTags: ['event'],
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
            invalidatesTags: ['event'],
            query: body => ({
                url: 'event/createEvent',
                method: 'POST',
                body: body
            })
        }),
        saveEvent: builder.mutation<void, string>({
            invalidatesTags: ['event'],
            query: id => ({
                url: `event/${id ?? ''}/save`,
                method: 'POST',
                body: {}
            })
        }),
        unSaveEvent: builder.mutation<void, string>({
            invalidatesTags: ['event'],
            query: id => ({
                url: `event/${id ?? ''}/unSave`,
                method: 'POST',
                body: {}
            })
        }),
        searchEventsCategories: builder.query<Array<LookUpModel>, void>({
            providesTags: ['categories'],
            query: () => ({
                url: `EventCategories/GetCategories`,
                method: 'GET',
            })
        })
    }),
});

export const {
    useSearchEventsQuery,
    useSearchSavedEventsQuery,
    useGetEventQuery,
    useCreateEventMutation,
    useSaveEventMutation,
    useUnSaveEventMutation,
    useSearchEventsCategoriesQuery,
} = EventApi;
