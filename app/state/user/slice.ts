import { Tokens, UserModel, initialState, loggedOutState } from '@/app/types';
import { SignupModel } from '@/app/types/user/signup';
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
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setUser: (state, action: PayloadAction<UserModel>) => {
            state.userModel = action.payload;
        },
        setSignUpState: (state, action: PayloadAction<UserModel>) => {
            state.signupState = action.payload
        }
    },
});

export const {
    logout,
    login,
    setTokens,
    setUser,
    setSignUpState,
} = userSlice.actions;

export default userSlice.reducer;
