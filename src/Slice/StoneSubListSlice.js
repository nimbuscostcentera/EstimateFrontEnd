import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/stonesub-list`;

export const StoneSubListFunc = createAsyncThunk(
  "StoneSubList",
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

const StoneSubListSlice = createSlice({
  name: "StoneSubList",
  initialState: {
    isloading13: false,
    Result13: [],
    error13: "",
    isError13: false,
    isSuccess13: false,
  },
  reducers: {
    ClearState13: (state) => {
      state.error13 = "";
      state.isError13 = false;
      state.isSuccess13 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(StoneSubListFunc.pending, (state) => {
        state.isloading13 = true;
        state.isError13 = false;
        state.isSuccess13 = false;
      })
      .addCase(StoneSubListFunc.fulfilled, (state, { payload }) => {
        state.isError13 = false;
        state.isloading13 = false;
        state.isSuccess13 = true;
        state.Result13 = payload;
      })
      .addCase(StoneSubListFunc.rejected, (state, { payload }) => {
        state.isloading13 = false;
        state.isError13 = true;
        state.isSuccess13 = false;
        state.error13 = payload;
      });
  },
});
export const { ClearState13 } = StoneSubListSlice.actions;
export default StoneSubListSlice.reducer;
