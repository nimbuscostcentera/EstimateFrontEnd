import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/loc-list`;

export const LocationListFunc = createAsyncThunk(
  "LocationList",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const LocationListSlice = createSlice({
  name: "LocationList",
  initialState: {
    isloading16: false,
    Result16: [],
    error16: "",
    isError16: false,
    isSuccess16: false,
  },
  reducers: {
    ClearState16: (state) => {
      state.error16 = "";
      state.isError16 = false;
      state.isSuccess16 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LocationListFunc.pending, (state) => {
        state.isloading16 = true;
        state.isError16 = false;
        state.isSuccess16 = false;
      })
      .addCase(LocationListFunc.fulfilled, (state, { payload }) => {
        state.isError16 = false;
        state.isloading16 = false;
        state.isSuccess16 = true;
        state.Result16 = payload;
      })
      .addCase(LocationListFunc.rejected, (state, { payload }) => {
        state.isloading16 = false;
        state.isError16 = true;
        state.isSuccess16 = false;
        state.error16 = payload;
      });
  },
});
export const { ClearState16 } = LocationListSlice.actions;
export default LocationListSlice.reducer;
