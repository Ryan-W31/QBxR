import {
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

// Async thunk to update the user info and refresh the token
export const updateUserInfoAndRefresh = createAsyncThunk(
  "user/updateUserInfoAndRefresh",
  async (body, thunkAPI) => {
    try {
      const updateResult = await thunkAPI
        .dispatch(apiSlice.endpoints.updateUserInfo.initiate(body))
        .unwrap();

      const refreshResult = await thunkAPI
        .dispatch(apiSlice.endpoints.refresh.initiate())
        .unwrap();

      console.log("User info updated and token refreshed");
    } catch (error) {
      console.error("Error updating user info and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// User API slice. This slice contains the signUp, getLeaderboard, updateUserInfo, updateUserPassword, getUserById, and getUserFavorites endpoints.
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...body },
      }),
    }),
    getLeaderboard: builder.query({
      query: () => ({
        url: "/user/leaderboard",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        if (response.data === undefined) {
          return [];
        }

        const users = response.data.map((user) => {
          return {
            ...user,
            id: user._id,
          };
        });
        return users;
      },
    }),
    updateUserInfo: builder.mutation({
      query: (body) => ({
        url: `/user/updateinfo/${body.id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("User info updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    updateUserPassword: builder.mutation({
      query: (body) => ({
        url: `/user/updatepassword/${body.id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return {
          id: response.id,
          firstname: response.firstname,
          lastname: response.lastname,
          email: response.email,
          school_organization: response.school_organization,
          bio: response.bio,
          birthday: response.birthday,
          phone_number: response.phone_number,
          status: response.status,
        };
      },
    }),
    getUserFavorites: builder.query({
      query: (id) => `/user/favorites/${id}`,
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
  useSignUpMutation,
  useGetLeaderboardQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useGetUserByIdQuery,
  useGetUserFavoritesQuery,
} = userApiSlice;

export const selectUsersResult = userApiSlice.endpoints.getLeaderboard.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
