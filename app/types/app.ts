export interface AppState {
  isLoading: boolean;
}

export const AppInitialState: AppState = {
  isLoading: false,
};

export type LookUpModel = {
  value: string;
  label: string;
};

export const primaryColor = "#A5583A";

export type AddressTypeForLocationHook = {
  city: { long_name: string; short_name: string };
  country: { long_name: string; short_name: string };
};

export const LATITUDE = 31.94639;
export const LONGITUDE = 35.97468;
