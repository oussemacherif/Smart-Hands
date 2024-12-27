import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { updateProviderData as apiUpdateProviderData } from '../../apiCalls/index';

interface ProviderState {
  providerData: any; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchProviderDataResponse {
  providerData: any;
}

export const updateProviderData = createAsyncThunk<FetchProviderDataResponse, any>(
  'user/updateProviderData',
  async (providerInfo, { dispatch, getState }) => {
    try {
      const token = (getState() as { auth: { authToken: string } }).auth.authToken;
      const providerId = (getState() as { provider: { providerData: { id: Number } } }).provider.providerData.id;

      const updateProviderData = await apiUpdateProviderData(providerId, token, providerInfo);

      dispatch(setProviderData(updateProviderData));

      return { providerData: updateProviderData };

    } catch (error) {
      console.error('Error updating provider data:', error);
      throw error;
    }
  }
);

const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    providerData: null,
    status: 'idle',
    error: null,
  } as ProviderState,
  reducers: {
    setProviderData: (state, action: PayloadAction<any>) => {
      state.providerData = action.payload;
    },
    clearProvider: (state) => {
      state.providerData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProviderData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateProviderData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.providerData = action.payload.providerData;
    });
    builder.addCase(updateProviderData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Error updating user data';
    });
  },
});

export const { setProviderData, clearProvider } = providerSlice.actions;
export const selectProviderData = (state: { provider: ProviderState }) => state.provider.providerData;

export default providerSlice.reducer;