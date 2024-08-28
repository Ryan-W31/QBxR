import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, AuthState } from "../../hooks/auth/authSlice";
import { IRootState } from "../store";

// Create a base query with the base URL of the API
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as IRootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Middleware for API calls. Checks if the token is expired and refreshes it.
const baseQueryWithRefresh = async (args: string | FetchArgs, api: BaseQueryApi, options: any) => {
  let res = await baseQuery(args, api, options);

  if (res?.error?.status === 403 || res?.error?.status === 401) {
    const refresh = await baseQuery("/auth/refresh", api, options);

    if (refresh?.data) {
      api.dispatch(
        setCredentials({
          accessToken: (refresh.data as AuthState).accessToken,
          userId: (refresh.data as AuthState).userId,
          user: (refresh.data as AuthState).user,
          scores: (refresh.data as AuthState).scores,
        })
      );
      res = await baseQuery(args, api, options);
    } else {
      api.dispatch(logOut());
    }
  }

  return res;
};

// Create an API slice with the base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({}),
});
