import {createApi} from '@reduxjs/toolkit/query/react';
import customFetchBase from '../middleware';
import { LoginModel, RefreshToken, UserModel } from '@/app/types';

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: customFetchBase,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: builder => ({
        login: builder.mutation<RefreshToken, LoginModel>({
            query: body => ({
                url: 'user/SignIn',
                method: 'POST',
                body,
            }),
        }),
        getUser: builder.query<UserModel, void>({
            query: () => ({
                url: 'user/me',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
} = UserApi;
