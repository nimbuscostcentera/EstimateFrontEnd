import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/documnet-routes/show-report`;

export const GoldRateTypeFunc = createAsyncThunk(
  "GoldRateTypeList",
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

const GoldRateTypeListSlice = createSlice({
  name: "GoldRateTypeList",
  initialState: {
    isloading7: false,
    Result7: [],
    error7: "",
    isError7: false,
    isSuccess7: false,
  },
  reducers: {
    ClearState7: (state) => {
      state.error7 = "";
      state.isError7 = false;
      state.isSuccess7 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GoldRateTypeFunc.pending, (state) => {
        state.isloading7 = true;
        state.isError7 = false;
        state.isSuccess7 = false;
      })
      .addCase(GoldRateTypeFunc.fulfilled, (state, { payload }) => {
        state.isError7 = false;
        state.isloading7 = false;
        state.isSuccess7 = true;
        state.Result7 = payload;
      })
      .addCase(GoldRateTypeFunc.rejected, (state, { payload }) => {
        state.isloading7 = false;
        state.isError7 = true;
        state.isSuccess7 = false;
        state.error7 = payload;
      });
  },
});
export const { ClearState7 } = GoldRateTypeListSlice.actions;
export default GoldRateTypeListSlice.reducer;
