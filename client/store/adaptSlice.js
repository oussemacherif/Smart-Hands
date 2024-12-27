import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  success: null,
  oneAnimal: {},
};

export const getOneAnimal = createAsyncThunk("adopt/getOneAnimal", async (id) => {
  try {
    const res = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/api/LFA/${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (er) {
    console.error(JSON.stringify(er));
  }
});

const adoptSlice = createSlice({
  name: "adopt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneAnimal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneAnimal.fulfilled, (state, action) => {
      state.loading = false;
      state.oneAnimal = action.payload;
    });
    builder.addCase(getOneAnimal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectOneAnimal = (state) => state.adopt.oneAnimal;

export default adoptSlice.reducer;
