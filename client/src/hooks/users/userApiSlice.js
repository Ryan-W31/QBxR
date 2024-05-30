import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
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
        const users = response.data.map((user) => {
          return {
            ...user,
            id: user._id,
          };
        });
        return users;
      },
    }),
  }),
});

export const { useSignUpMutation, useGetLeaderboardQuery } = userApiSlice;
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
