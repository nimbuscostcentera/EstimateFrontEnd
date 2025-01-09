import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/salesman-list`;

export const SalesManListFunc = createAsyncThunk(
  "SalesManList",
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

const SalesManListSlice = createSlice({
  name: "SalesManList",
  initialState: {
    isloading11: false,
    Result11: [],
    error11: "",
    isError11: false,
    isSuccess11: false,
  },
  reducers: {
    ClearState11: (state) => {
      state.error11 = "";
      state.isError11 = false;
      state.isSuccess11 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SalesManListFunc.pending, (state) => {
        state.isloading11 = true;
        state.isError11 = false;
        state.isSuccess11 = false;
      })
      .addCase(SalesManListFunc.fulfilled, (state, { payload }) => {
        state.isError11 = false;
        state.isloading11 = false;
        state.isSuccess11 = true;
        state.Result11 = payload;
      })
      .addCase(SalesManListFunc.rejected, (state, { payload }) => {
        state.isloading11 = false;
        state.isError11 = true;
        state.isSuccess11 = false;
        state.error11 = payload;
      });
  },
});
export const { ClearState11 } = SalesManListSlice.actions;
export default SalesManListSlice.reducer;
