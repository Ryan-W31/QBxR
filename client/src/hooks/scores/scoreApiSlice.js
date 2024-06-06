import { createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const scoreAdapter = createEntityAdapter({});
const initialState = scoreAdapter.getInitialState();

export const updateVRScoreAndRefresh = createAsyncThunk(
  "user/updateVRScoreAndRefresh",
  async (body, thunkAPI) => {
    try {
      const updateResult = await thunkAPI
        .dispatch(apiSlice.endpoints.setVRScore.initiate(body))
        .unwrap();

      const refreshResult = await thunkAPI
        .dispatch(apiSlice.endpoints.refresh.initiate())
        .unwrap();

      console.log("VR score updated and token refreshed");
    } catch (error) {
      console.error("Error updating VR score and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWebScoreAndRefresh = createAsyncThunk(
  "user/updateWebScoreAndRefresh",
  async (body, thunkAPI) => {
    try {
      const updateResult = await thunkAPI
        .dispatch(apiSlice.endpoints.setWebScore.initiate(body))
        .unwrap();

      const refreshResult = await thunkAPI
        .dispatch(apiSlice.endpoints.refresh.initiate())
        .unwrap();

      console.log("Web Score updated and token refreshed");
    } catch (error) {
      console.error("Error updating web score and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query({
      query: (id) => `/score/${id}`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
    setVRScore: builder.mutation({
      query: (body) => ({
        url: `/score/setvrscore/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    setWebScore: builder.mutation({
      query: (body) => ({
        url: `/score/setwebscore/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    getVRScore: builder.query({
      query: (id) => `/score/getvrscore/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
    getWebScore: builder.query({
      query: (id) => `/score/getwebscore/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
    getQBxRScore: builder.query({
      query: (id) => `/score/getqbxrscore/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetScoresQuery,
  useSetVRScoreMutation,
  useSetWebScoreMutation,
  useGetVRScoreQuery,
  useGetWebScoreQuery,
  useGetQBxRScoreQuery,
} = scoreApiSlice;
