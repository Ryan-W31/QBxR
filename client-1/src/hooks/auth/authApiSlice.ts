import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

interface RefreshResponse {
  accessToken: string;
  userId: string;
  user: string;
  scores: any;
}
// Auth API slice. This slice contains the login, refresh, and logout endpoints.
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.query<RefreshResponse, void>({
      query: () => `/auth/refresh`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const refresh = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: refresh.data.accessToken,
              userId: refresh.data.userId,
              user: refresh.data.user,
              scores: refresh.data.scores,
            })
          );

          console.log("Refreshed token");
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
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/verify/${token}`,
        method: "PATCH",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/reset/${body.id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
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
  useRefreshQuery,
  useSendVerificationMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
