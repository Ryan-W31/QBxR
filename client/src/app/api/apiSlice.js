import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../hooks/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://qbxr.net/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, options) => {
  let res = await baseQuery(args, api, options);

  if (res?.error?.status === 403 || res?.error?.status === 401) {
    const refresh = await baseQuery("/auth/refresh", api, options);

    if (refresh?.data) {
      api.dispatch(setCredentials({ ...refresh.data }));
      res = await baseQuery(args, api, options);
    } else {
      api.dispatch(logOut());
    }
  }

  return res;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({}),
});
