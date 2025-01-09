import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/auth-routes/user-edit`;

export const UserEditFunc = createAsyncThunk(
  "UserEdit",
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

const UserEditSlice = createSlice({
  name: "UserEdit",
  initialState: {
    isloading17: false,
    Result17: {},
    error17: "",
    isError17: false,
    isSuccess17: false,
  },
  reducers: {
    ClearState17: (state) => {
      state.error17 = "";
      state.isError17 = false;
      state.isSuccess17 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserEditFunc.pending, (state) => {
        state.isloading17 = true;
        state.isError17 = false;
        state.isSuccess17 = false;
      })
      .addCase(UserEditFunc.fulfilled, (state, { payload }) => {
        state.isError17 = false;
        state.isloading17 = false;
        state.isSuccess17 = true;
        state.Result17 = payload;
      })
      .addCase(UserEditFunc.rejected, (state, { payload }) => {
        state.isloading17 = false;
        state.isError17 = true;
        state.isSuccess17 = false;
        state.error17 = payload;
      });
  },
});
export const { ClearState17 } = UserEditSlice.actions;
export default UserEditSlice.reducer;
