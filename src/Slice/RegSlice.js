import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/user-registration`;

export const RegFunc = createAsyncThunk(
  "Reg",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response;
    } catch (error1) {
      return rejectWithValue(error1.response.data.response);
    }
  }
);

const RegSlice = createSlice({
  name: "Reg",
  initialState: {
    isloading1: false,
    Result1: {},
    error1: "",
    isError1: false,
    isSuccess1: false,
  },
  reducers: {
    ClearState1: (state) => {
      state.error1 = "";
      state.isError1 = false;
      state.isSuccess1 = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegFunc.pending, (state) => {
        state.isloading1 = true;
        state.isError1 = false;
        state.isSuccess1 = false;
      })
      .addCase(RegFunc.fulfilled, (state, { payload }) => {
        state.isError1 = false;
        state.isloading1 = false;
        state.isSuccess1 = true;
        state.Result1 = payload;
      })
      .addCase(RegFunc.rejected, (state, { payload }) => {
        state.isloading1 = false;
        state.isError1 = true;
        state.isSuccess1 = false;
        state.error1 = payload;
      });
  },
});
export const { ClearState1} = RegSlice.actions;
export default RegSlice.reducer;
