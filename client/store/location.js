import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    selecteEventLocation: null,
};

const locSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    locAgn: (state, action) => {
      state.selecteEventLocation = action.payload;
    },
  },
});
export const { locAgn } = locSlice.actions;
export default locSlice.reducer;