import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authSlice from './authSlice';

const persistConfig = {
    key: 'root',
    version:1,
    storage,
}
const reducer = combineReducers({
    cart: cartReducer,
    user: authSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
