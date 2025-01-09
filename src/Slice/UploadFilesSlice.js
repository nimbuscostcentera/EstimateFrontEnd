import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_BASEURL}/documnet-routes/documnet-upload`;

export const UploadFileFunc = createAsyncThunk(
  "Reg",
  async (UserData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(URL, UserData, config);
      return data?.response;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

const UploadFileSlice = createSlice({
  name: "Reg",
  initialState: {
    isloading2: false,
    Result2: {},
    error2: "",
    isError2: false,
    isSuccess2: false,
  },
  reducers: {
    ClearState2: (state) => {
      state.error2 = "";
      state.isError2 = false;
      state.isSuccess2 = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UploadFileFunc.pending, (state) => {
        state.isloading2 = true;
        state.isError2 = false;
        state.isSuccess2 = false;
      })
      .addCase(UploadFileFunc.fulfilled, (state, { payload }) => {
        state.isError2 = false;
        state.isloading2 = false;
        state.isSuccess2 = true;
        state.Result2 = payload;
      })
      .addCase(UploadFileFunc.rejected, (state, { payload }) => {
        state.isloading2 = false;
        state.isError2 = true;
        state.isSuccess2 = false;
        state.error2 = payload;
      });
  },
});
export const { ClearState2 } = UploadFileSlice.actions;
export default UploadFileSlice.reducer;
