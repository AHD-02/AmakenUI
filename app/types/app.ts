export interface AppState {
    isLoading: boolean;
}

export const AppInitialState: AppState = {
    isLoading: false,
}

export type LookUpModel = {
    value: string;
    label: string;
}