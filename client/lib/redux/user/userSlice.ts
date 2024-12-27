import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { updateUserData as apiUpdateUserData } from '../../apiCalls/index';

interface UserState {
  userData: any; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchUserDataResponse {
  userData: any;
}

export const updateUserData = createAsyncThunk<FetchUserDataResponse, any>(
  'user/updateUserData',
  async (userInfo, { dispatch, getState }) => {
    try {
      const token = (getState() as { auth: { authToken: string } }).auth.authToken;
      const userId = (getState() as { user: { userData: { id: Number } } }).user.userData.id;

      const updatedUserData = await apiUpdateUserData(userId, token, userInfo);// until here done
      
      dispatch(setUserData(updatedUserData));

      return { userData: updatedUserData };

    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
  } as UserState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.userData = action.payload.userData;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Error updating user data';
    });
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export const selectUserData = (state: { user: UserState }) => state.user.userData;

export default userSlice.reducer;