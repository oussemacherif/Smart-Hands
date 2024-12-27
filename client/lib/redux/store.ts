
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import { useDispatch } from 'react-redux';
import mapReducer from './map/mapSlice'
import location from './map/location';
import providerReducer from './provider/providerSlice'



const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    provider: providerReducer,
    location:location
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;