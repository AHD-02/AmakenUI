export type Locale = "en" | "ar";

export interface UserModel {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth: Date;
  phone?: string;
  images?: string[];
  savedEvents?: string[];
  country?: string;
  city?: string;
  status: string;
  intrests?: Array<string>;
}

export const UserInitialValues: UserModel = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  phone: "",
  images: [],
  savedEvents: [],
  country: "",
  city: "",
  status: "",
  intrests: [],
};

export const initialState: UserState = {
  isLoading: false,
  isLoggedIn: false,
  isBlocked: false,
  isGuest: false,
  phoneNumber: "",
  theme: null,
  userModel: UserInitialValues,
  signupState: UserInitialValues,
};

export interface UserState {
  isLoading: boolean;
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
  isBlocked: boolean;
  isGuest: boolean;
  phoneNumber: string;
  theme: "dark" | "light" | null;
  userModel: UserModel;
  signupState: UserModel;
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
  phoneNumber: "",
  theme: null,
  userModel: UserInitialValues,
  signupState: UserInitialValues,
};

export interface LoginModel {
  email: string;
  password: string;
}

export type AddressTypeForLocationHook = {
  city: { long_name: string; short_name: string };
  country: { long_name: string; short_name: string };
};
