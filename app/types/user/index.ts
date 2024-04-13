export type Locale = 'en' | 'ar';
export const initialState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    isBlocked: false,
    isGuest: false,
    phoneNumber: '',
    theme: null
};



export interface UserState {
    isLoading: boolean;
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn: boolean;
    isBlocked: boolean;
    isGuest: boolean;
    phoneNumber: string;
    theme: 'dark' | 'light' | null;
}

export type Tokens = {
    accessToken?: string;
    refreshToken?: string;
    isBlocked?: boolean;
    profileCompleted?: boolean;
};

export type RefreshToken = {
    jwt: string;
    refreshToken?: string;
};

export const loggedOutState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    isBlocked: false,
    isGuest: false,
    phoneNumber: '',
    theme: null,
};

export interface LoginModel {
    email: string
    password: string
}