import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/reporttype-list`;

export const ReportTypeListFunc = createAsyncThunk(
  "ReportTypeList",
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

const ReportTypeListSlice = createSlice({
  name: "ReportTypeList",
  initialState: {
    isloading9: false,
    Result9: [],
    error9: "",
    isError9: false,
    isSuccess9: false,
  },
  reducers: {
    ClearState9: (state) => {
      state.error9 = "";
      state.isError9 = false;
      state.isSuccess9 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ReportTypeListFunc.pending, (state) => {
        state.isloading9 = true;
        state.isError9 = false;
        state.isSuccess9 = false;
      })
      .addCase(ReportTypeListFunc.fulfilled, (state, { payload }) => {
        state.isError9 = false;
        state.isloading9 = false;
        state.isSuccess9 = true;
        state.Result9 = payload;
      })
      .addCase(ReportTypeListFunc.rejected, (state, { payload }) => {
        state.isloading9 = false;
        state.isError9 = true;
        state.isSuccess9 = false;
        state.error9 = payload;
      });
  },
});
export const { ClearState9 } = ReportTypeListSlice.actions;
export default ReportTypeListSlice.reducer;
