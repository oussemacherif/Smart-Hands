import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthState {
  authToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const loadAuthToken = createAsyncThunk('auth/loadAuthToken', async (_, { dispatch }) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      dispatch(setAuthToken(token));
    }
  } catch (error) {
    console.error('Error loading token:', error);
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    status: 'idle',
    error: null,
  } as AuthState, 
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    clearToken: (state) => {
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAuthToken.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadAuthToken.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(loadAuthToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { setAuthToken, clearToken } = authSlice.actions;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.authToken;

export default authSlice.reducer;