import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "../hooks/auth/auth";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/api/user/signup",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/api/user",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        const users = response.map((user) => {
          user.id = user._id;
          return users;
        });
      },
      providedTags: (res, err, args) => {
        if (res?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...res.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useGetUsersQuery } = userApiSlice;
export const selectUsersResult = user;

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
