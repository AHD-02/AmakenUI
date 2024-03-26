export type Locale = 'en' | 'ar';
export const initialState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    isBlocked: false,
    isGuest: false,
    phoneNumber: '',
};



export interface UserState {
    isLoading: boolean;
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn: boolean;
    isBlocked: boolean;
    isGuest: boolean;
    phoneNumber: string;
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
};
