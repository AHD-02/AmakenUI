import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '../store';
import { logout } from '../user/slice';

export const logoutAction = createAsyncThunk(
  'logout',
  async (_: void, thunkAPI) => {
    thunkAPI.dispatch(logout());
    await persistor.flush();
    await AsyncStorage.removeItem('persist:root');
  },
);
