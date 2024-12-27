import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../lib/redux/auth/authSlice';
import { clearUser } from '../../../lib/redux/user/userSlice';
import { clearProvider } from '../../../lib/redux/provider/providerSlice';

const useLogout = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      navigation.navigate('Login' as never);
      dispatch(clearToken());
      dispatch(clearUser());
      await AsyncStorage.removeItem('authToken');
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return handleLogout;
};

export default useLogout;
