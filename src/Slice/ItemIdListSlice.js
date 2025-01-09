import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/id-list`;

export const ItemIdListFunc = createAsyncThunk(
  "ItemIdList",
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

const ItemIdListSlice = createSlice({
  name: "ItemIdList",
  initialState: {
    isloading5: false,
    Result5: [],
    error5: "",
    isError5: false,
    isSuccess5: false,
  },
  reducers: {
    ClearState5: (state) => {
      state.error5 = "";
      state.isError5 = false;
      state.isSuccess5 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ItemIdListFunc.pending, (state) => {
        state.isloading5 = true;
        state.isError5 = false;
        state.isSuccess5 = false;
      })
      .addCase(ItemIdListFunc.fulfilled, (state, { payload }) => {
        state.isError5 = false;
        state.isloading5 = false;
        state.isSuccess5 = true;
        state.Result5 = payload;
      })
      .addCase(ItemIdListFunc.rejected, (state, { payload }) => {
        state.isloading5 = false;
        state.isError5 = true;
        state.isSuccess5 = false;
        state.error5 = payload;
      });
  },
});
export const { ClearState5 } = ItemIdListSlice.actions;
export default ItemIdListSlice.reducer;
