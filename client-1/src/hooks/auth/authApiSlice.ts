import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

interface AuthResponse {
  userId: string;
  user: any;
  scores: any;
}

interface Credentials {
  email: string;
  password: string;
}

// Auth API slice. This slice contains the login, refresh, and logout endpoints.
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...body },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            setCredentials({
              userId: res.data.userId,
              user: res.data.user,
              scores: res.data.scores,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    login: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            setCredentials({
              userId: res.data.userId,
              user: res.data.user,
              scores: res.data.scores,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
      transformResponse: (response: AuthResponse) => {
        return response;
      },
    }),
    refresh: builder.query<AuthResponse, void>({
      query: () => `/auth/refresh`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const refresh = await queryFulfilled;
          dispatch(
            setCredentials({
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
    sendEmailVerification: builder.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body: body,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify/${token}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApiSlice.endpoints.refresh.initiate());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/password/reset`,
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
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
  useSignUpMutation,
  useLoginMutation,
  useRefreshQuery,
  useSendEmailVerificationMutation,
  useVerifyEmailQuery,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
