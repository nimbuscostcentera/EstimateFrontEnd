import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/purity-list`;

export const PurityListFunc = createAsyncThunk(
  "PurityList",
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

const PurityListSlice = createSlice({
  name: "PurityList",
  initialState: {
    isloading8: false,
    Result8: [],
    error8: "",
    isError8: false,
    isSuccess8: false,
  },
  reducers: {
    ClearState8: (state) => {
      state.error8 = "";
      state.isError8 = false;
      state.isSuccess8 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PurityListFunc.pending, (state) => {
        state.isloading8 = true;
        state.isError8 = false;
        state.isSuccess8 = false;
      })
      .addCase(PurityListFunc.fulfilled, (state, { payload }) => {
        state.isError8 = false;
        state.isloading8 = false;
        state.isSuccess8 = true;
        state.Result8 = payload;
      })
      .addCase(PurityListFunc.rejected, (state, { payload }) => {
        state.isloading8 = false;
        state.isError8 = true;
        state.isSuccess8 = false;
        state.error8 = payload;
      });
  },
});
export const { ClearState8 } = PurityListSlice.actions;
export default PurityListSlice.reducer;
