import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/item-list`;

export const ItemCodeListFunc = createAsyncThunk(
  "ItemCodeList",
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

const ItemCodeListSlice = createSlice({
  name: "ItemCodeList",
  initialState: {
    isloading4: false,
    Result4: [],
    error4: "",
    isError4: false,
    isSuccess4: false,
  },
  reducers: {
    ClearState4: (state) => {
      state.error4 = "";
      state.isError4 = false;
      state.isSuccess4 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ItemCodeListFunc.pending, (state) => {
        state.isloading4 = true;
        state.isError4 = false;
        state.isSuccess4 = false;
      })
      .addCase(ItemCodeListFunc.fulfilled, (state, { payload }) => {
        state.isError4 = false;
        state.isloading4 = false;
        state.isSuccess4 = true;
        state.Result4 = payload;
      })
      .addCase(ItemCodeListFunc.rejected, (state, { payload }) => {
        state.isloading4 = false;
        state.isError4 = true;
        state.isSuccess4 = false;
        state.error4 = payload;
      });
  },
});
export const { ClearState4 } = ItemCodeListSlice.actions;
export default ItemCodeListSlice.reducer;
