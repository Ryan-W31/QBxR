import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";
import { authApiSlice } from "../auth/authApiSlice";

// Async thunk to update the user info and refresh the token
export const updateUserInfoAndRefresh = createAsyncThunk("user/updateUserInfoAndRefresh", async (body, thunkAPI) => {
  try {
    await thunkAPI.dispatch(userApiSlice.endpoints.updateUserInfo.initiate(body)).unwrap();

    await thunkAPI.dispatch(authApiSlice.endpoints.refresh.initiate()).unwrap();

    console.log("User info updated and token refreshed");
  } catch (error) {
    console.error("Error updating user info and refreshing token:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUserPasswordAndRefresh = createAsyncThunk(
  "user/updateUserPasswordAndRefresh",
  async (body, thunkAPI) => {
    try {
      const updateResult = await thunkAPI.dispatch(userApiSlice.endpoints.updateUserPassword.initiate(body)).unwrap();

      await thunkAPI.dispatch(authApiSlice.endpoints.refresh.initiate()).unwrap();

      console.log("User Password updated and token refreshed");
      return updateResult;
    } catch (error) {
      console.error("Error updating user info and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
