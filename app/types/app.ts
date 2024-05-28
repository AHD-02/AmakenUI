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


export const LATITUDE = 31.94639;
export const LONGITUDE = 35.97468;
