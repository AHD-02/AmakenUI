export type Locale = 'en' | 'ar';

export interface UserModel {
    Email?: string;
    Password?: string;
    FirstName?: string;
    LastName?: string;
    DateOfBirth: Date;
    Phone?: string;
    Images?: string[];
    SavedEvents?: string[];
    Country?: string;
    City?: string;
    Status: string;
}

const UserInitialValues: UserModel = {
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: new Date(),
    Phone: "",
    Images: [],
    SavedEvents: [],
    Country: "",
    City: "",
    Status: "OK"
};

export const initialState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    isBlocked: false,
    isGuest: false,
    phoneNumber: '',
    theme: null,
    userModel: UserInitialValues
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
    userModel: UserModel
}

export type Tokens = {
    accessToken?: string;
    refreshToken?: string;
    isBlocked?: boolean;
    profileCompleted?: boolean;
};

export type RefreshToken = {
    token: string;
    refreshToken?: string;
};

export const loggedOutState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    isBlocked: false,
    isGuest: false,
    phoneNumber: '',
    theme: null,
    userModel: UserInitialValues
};

export interface LoginModel {
    email: string
    password: string
}