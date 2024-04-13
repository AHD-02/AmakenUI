import { AppInitialState } from '@/app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: AppInitialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    setIsLoading,
} = appSlice.actions;

export default appSlice.reducer;
