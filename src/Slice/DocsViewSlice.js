import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/documnet-routes/show-report`;

export const DocsViewFunc = createAsyncThunk(
  "ViewReport",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response[0];
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const DocsViewSlice = createSlice({
  name: "ViewReport",
  initialState: {
    isloading3: false,
    Result3: {},
    error3: "",
    isError3: false,
    isSuccess3: false,
  },
  reducers: {
    ClearState3: (state) => {
      state.error3 = "";
      state.isError3 = false;
      state.isSuccess3 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DocsViewFunc.pending, (state) => {
        state.isloading3 = true;
        state.isError3 = false;
        state.isSuccess3 = false;
      })
      .addCase(DocsViewFunc.fulfilled, (state, { payload }) => {
        state.isError3 = false;
        state.isloading3 = false;
        state.isSuccess3 = true;
        state.Result3 = payload;
      })
      .addCase(DocsViewFunc.rejected, (state, { payload }) => {
        state.isloading3 = false;
        state.isError3 = true;
        state.isSuccess3 = false;
        state.error3 = payload;
      });
  },
});
export const { ClearState3 } = DocsViewSlice.actions;
export default DocsViewSlice.reducer;
