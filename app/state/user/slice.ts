import { initialState, loggedOutState } from '@/app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => loggedOutState,
        // setTokens: (state, action: PayloadAction<Tokens>) => {
        //     state.accessToken = action.payload.accessToken;
        //     state.refreshToken = action.payload.refreshToken;
        //     state.isBlocked = action.payload.isBlocked;
        //     state.isLoggedIn =
        //         Boolean(action?.payload?.accessToken) &&
        //         Boolean(action?.payload?.refreshToken) &&
        //         action.payload.profileCompleted;
        // },
        login: state => {
            state.isLoggedIn = true;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
    },
});

export const {
    logout,
    login,
} = userSlice.actions;

export default userSlice.reducer;
