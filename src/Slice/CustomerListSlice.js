import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/customer-list`;

export const CustomerListFunc = createAsyncThunk(
  "CustomerList",
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

const CustomerListSlice = createSlice({
  name: "CustomerList",
  initialState: {
    isloading10: false,
    Result10: [],
    error10: "",
    isError10: false,
    isSuccess10: false,
  },
  reducers: {
    ClearState10: (state) => {
      state.error10 = "";
      state.isError10 = false;
      state.isSuccess10 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CustomerListFunc.pending, (state) => {
        state.isloading10 = true;
        state.isError10 = false;
        state.isSuccess10 = false;
      })
      .addCase(CustomerListFunc.fulfilled, (state, { payload }) => {
        state.isError10 = false;
        state.isloading10 = false;
        state.isSuccess10 = true;
        state.Result10 = payload;
      })
      .addCase(CustomerListFunc.rejected, (state, { payload }) => {
        state.isloading10 = false;
        state.isError10 = true;
        state.isSuccess10 = false;
        state.error10 = payload;
      });
  },
});
export const { ClearState10 } = CustomerListSlice.actions;
export default CustomerListSlice.reducer;
