import { createAsyncThunk } from "@reduxjs/toolkit";
import { scoreApiSlice } from "./scoreApiSlice";
import { authApiSlice } from "../auth/authApiSlice";

// Async thunk to update the VR score and refresh the token
export const updateVRScoreAndRefresh = createAsyncThunk("user/updateVRScoreAndRefresh", async (body, thunkAPI) => {
  try {
    await thunkAPI.dispatch(scoreApiSlice.endpoints.setVRScore.initiate(body)).unwrap();

    await thunkAPI.dispatch(authApiSlice.endpoints.refresh.initiate()).unwrap();

    console.log("VR score updated and token refreshed");
  } catch (error) {
    console.error("Error updating VR score and refreshing token:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Async thunk to update the web score and refresh the token
export const updateWebScoreAndRefresh = createAsyncThunk("user/updateWebScoreAndRefresh", async (body, thunkAPI) => {
  try {
    await thunkAPI.dispatch(scoreApiSlice.endpoints.setWebScore.initiate(body)).unwrap();

    await thunkAPI.dispatch(authApiSlice.endpoints.refresh.initiate()).unwrap();

    console.log("Web Score updated and token refreshed");
  } catch (error) {
    console.error("Error updating web score and refreshing token:", error);
    return thunkAPI.rejectWithValue(error);
  }
});
