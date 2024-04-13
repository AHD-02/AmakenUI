import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import { LoginModel, RefreshToken } from '@/app/types';

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: customFetchBase,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: builder => ({
        login: builder.mutation<RefreshToken, LoginModel>({
            query: body => ({
                url: 'accounts/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
} = UserApi;
