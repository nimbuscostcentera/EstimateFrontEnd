import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/company-list`;

export const CompanyListFunc = createAsyncThunk(
  "CompanyList",
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

const CompanyListSlice = createSlice({
  name: "CompanyList",
  initialState: {
    isloading12: false,
    Result12: [],
    error12: "",
    isError12: false,
    isSuccess12: false,
  },
  reducers: {
    ClearState12: (state) => {
      state.error12 = "";
      state.isError12 = false;
      state.isSuccess12 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyListFunc.pending, (state) => {
        state.isloading12 = true;
        state.isError12 = false;
        state.isSuccess12 = false;
      })
      .addCase(CompanyListFunc.fulfilled, (state, { payload }) => {
        state.isError12 = false;
        state.isloading12 = false;
        state.isSuccess12 = true;
        state.Result12 = payload;
      })
      .addCase(CompanyListFunc.rejected, (state, { payload }) => {
        state.isloading12 = false;
        state.isError12 = true;
        state.isSuccess12 = false;
        state.error12 = payload;
      });
  },
});
export const { ClearState12 } = CompanyListSlice.actions;
export default CompanyListSlice.reducer;
