import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/stone-list`;

export const StoneListFunc = createAsyncThunk(
  "StoneList",
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

const StoneListSlice = createSlice({
  name: "StoneList",
  initialState: {
    isloading6: false,
    Result6: [],
    error6: "",
    isError6: false,
    isSuccess6: false,
  },
  reducers: {
    ClearState6: (state) => {
      state.error6 = "";
      state.isError6 = false;
      state.isSuccess6 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(StoneListFunc.pending, (state) => {
        state.isloading6 = true;
        state.isError6 = false;
        state.isSuccess6 = false;
      })
      .addCase(StoneListFunc.fulfilled, (state, { payload }) => {
        state.isError6 = false;
        state.isloading6 = false;
        state.isSuccess6 = true;
        state.Result6 = payload;
      })
      .addCase(StoneListFunc.rejected, (state, { payload }) => {
        state.isloading6 = false;
        state.isError6 = true;
        state.isSuccess6 = false;
        state.error6 = payload;
      });
  },
});
export const { ClearState6 } = StoneListSlice.actions;
export default StoneListSlice.reducer;
