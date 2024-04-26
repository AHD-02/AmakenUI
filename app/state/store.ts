import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSlice } from './user/slice';
import { appSlice } from './app/slice';
import { UserApi } from '../data/user';
import { EventApi } from '../data/events';


const reducers = combineReducers({
    user: userSlice.reducer,
    app: appSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [EventApi.reducerPath]: EventApi.reducer,
});
const persistConfig = {
    key: 'root',
    whitelist: ['user', 'guest'],
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        __DEV__
            ? getDefaultMiddleware({
                serializableCheck: false,
            }).concat([
                UserApi.middleware,
                EventApi.middleware,
            ])
            : getDefaultMiddleware({
                serializableCheck: false,
            }).concat([
                UserApi.middleware,
                EventApi.middleware,
            ]),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
