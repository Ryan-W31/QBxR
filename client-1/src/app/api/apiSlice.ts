import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, AuthState } from "../../hooks/auth/authSlice";
import { IRootState } from "../store";

export const UNAUTHORIZED = 401;
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
interface ErrorResponse {
  errorCode?: string;
  // Add any other fields you expect here
}

interface CustomError {
  status: number;
  data: ErrorResponse;
}

const baseQueryWithRefresh = async (args: string | FetchArgs, api: BaseQueryApi, options: any) => {
  let res = await baseQuery(args, api, options);

  const error = res.error as CustomError;

  if (error?.status === UNAUTHORIZED && error?.data?.errorCode === "InvalidAccessToken") {
    const refresh = await baseQuery("/auth/refresh", api, options);

    if (refresh?.data) {
      const authState = refresh.data as AuthState;
      api.dispatch(
        setCredentials({
          accessToken: authState.accessToken,
          userId: authState.userId,
          user: authState.user,
          scores: authState.scores,
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
