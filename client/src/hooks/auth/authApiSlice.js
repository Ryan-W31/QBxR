import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateIsVerifiedAndRefresh = createAsyncThunk(
  "user/updateIsVerifiedAndRefresh",
  async (token, thunkAPI) => {
    try {
      const updateResult = await thunkAPI
        .dispatch(apiSlice.endpoints.verifyEmail.initiate(token))
        .unwrap();

      const refreshResult = await thunkAPI
        .dispatch(apiSlice.endpoints.refresh.initiate())
        .unwrap();

      console.log("User info updated and token refreshed");
      return updateResult;
    } catch (error) {
      console.error("Error updating user info and refreshing token:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Auth API slice. This slice contains the login, refresh, and logout endpoints.
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const refresh = await queryFulfilled;
          dispatch(
            setCredentials({
              aToken: refresh.data.aToken,
              id: refresh.data.id,
              user: refresh.data.user,
              scores: refresh.data.scores,
            })
          );

          console.log("Refreshed token");
          return refresh;
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendVerification: builder.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/verify/${token}`,
        method: "PATCH",
      }),
      transformResponse: (response) => {
        return response.isVerified;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log("Error " + err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendVerificationMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApiSlice;
