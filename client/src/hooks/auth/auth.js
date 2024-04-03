import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.aToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args, apiR, options) => {
  let res = await fetch(baseQuery(args, apiR, options));

  if (res?.error?.status === 403) {
    const refresh = await baseQuery("/api/auth/refresh", apiR, options);

    if (refresh?.data) {
      apiR.dispatch(setCredentials({ ...refresh.data }));
      res = await fetch(baseQuery(args, apiR, options));
    } else {
      if (refresh?.error?.status === 403) {
        refresh.error.data.message = "Session expired. Please log in again.";
      }

      return refresh;
    }
  }

  return res;
};

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseQueryWithRefresh,
  }),
  endpoints: (builder) => ({}),
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    aToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.aToken = action.payload;
    },
    logOut: (state, action) => {
      state.aToken = null;
    },
  },
});

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/api/auth/refresh",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(api.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApiSlice;

export { api };
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.aToken;
