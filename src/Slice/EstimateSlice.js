import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/estimate-add`;

export const EstimateFunc = createAsyncThunk(
  "Estimate",
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

const EstimateSlice = createSlice({
  name: "Estimate",
  initialState: {
    isloading14: false,
    Result14: [],
    error14: "",
    isError14: false,
    isSuccess14: false,
  },
  reducers: {
    ClearState14: (state) => {
      state.error14 = "";
      state.isError14 = false;
      state.isSuccess14 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EstimateFunc.pending, (state) => {
        state.isloading14 = true;
        state.isError14 = false;
        state.isSuccess14 = false;
      })
      .addCase(EstimateFunc.fulfilled, (state, { payload }) => {
        state.isError14 = false;
        state.isloading14 = false;
        state.isSuccess14 = true;
        state.Result14 = payload;
      })
      .addCase(EstimateFunc.rejected, (state, { payload }) => {
        state.isloading14 = false;
        state.isError14 = true;
        state.isSuccess14 = false;
        state.error14 = payload;
      });
  },
});
export const { ClearState14 } = EstimateSlice.actions;
export default EstimateSlice.reducer;
