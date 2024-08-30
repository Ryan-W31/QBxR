import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";

export const updateIsVerifiedAndRefresh = createAsyncThunk(
  "user/updateIsVerifiedAndRefresh",
  async (token, thunkAPI) => {
    try {
      const updateResult = await thunkAPI.dispatch(authApiSlice.endpoints.verifyEmail.initiate(token)).unwrap();

      await thunkAPI.dispatch(authApiSlice.endpoints.refresh.initiate()).unwrap();

      console.log("User info updated and token refreshed");
      return updateResult;
    } catch (error) {
      console.error("Error updating user info and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
