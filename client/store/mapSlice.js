
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
  list: [],
  
};


export const getProviderData = createAsyncThunk("map/getProviderData", async () => {
    try {
      const res = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/api/provider`
      );
      return res.data;
    } catch (er) {
      console.error(JSON.stringify(er));
    }
  });
 

  
  const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
    
      builder.addCase(getProviderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(getProviderData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
      builder.addCase(getProviderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
     
    },
  });
  export const List = (state) => state.map.list;


  export default mapSlice.reducer