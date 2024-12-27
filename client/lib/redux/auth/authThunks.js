
import { setAuthToken } from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthTokenAction = (token) => {
 
  AsyncStorage.setItem('authToken', token)
    .then(() => {
      console.log('Token stored successfully');
    })
    .catch((error) => {
      console.error('Error storing token:', error);
    });
  return setAuthToken(token);
};