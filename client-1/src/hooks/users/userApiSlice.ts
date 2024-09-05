import { apiSlice } from "../../app/api/apiSlice";
import { authApiSlice } from "../auth/authApiSlice";
import { setCredentials } from "../auth/authSlice";

interface LeaderboardUser {
  userId: string;
  role: string;
  rank: number;
  name: string;
  school: string;
  score: number;
}

interface User {
  _id: string;
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  school_organization: string;
  bio: string;
  birthday: Date;
  phone_number: string;
  status: boolean;
  score: number;
  favorites: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  scores: any;
}

type LeaderboardResponse = LeaderboardUser[];
// User API slice. This slice contains the signUp, getLeaderboard, updateUserInfo, updateUserPassword, getUserById, and getUserFavorites endpoints.
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<AuthResponse, void>({
      query: () => "/user",
      keepUnusedDataFor: 60,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            setCredentials({
              userId: response.data.user._id,
              user: response.data.user,
              scores: response.data.scores,
            })
          );
        } catch (err) {
          console.error("Error when refreshing info:", err);
        }
      },
      transformResponse: (response: AuthResponse) => {
        return response;
      },
    }),
    getLeaderboard: builder.query<LeaderboardUser[], void>({
      query: () => "/user/leaderboard",
      keepUnusedDataFor: 60,
      transformResponse: (response: { data: LeaderboardResponse }) => {
        if (response === undefined) {
          return [];
        }

        const users = response.data.map((user) => {
          return {
            ...user,
            userId: user.userId,
          };
        });
        return users;
      },
    }),
    updateUserInfo: builder.mutation({
      query: (body) => ({
        url: `/user/update/info`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            setCredentials({
              user: response.data.user,
            })
          );
          console.log("User info updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    updateUserPassword: builder.mutation({
      query: (body) => ({
        url: `/user/update/password`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApiSlice.endpoints.refresh.initiate());
          console.log("User password updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    getUserById: builder.query<User, string | undefined>({
      query: (userId) => `/user/id/${userId}`,
      keepUnusedDataFor: 60,
      transformResponse: (response: User) => {
        return {
          _id: response._id,
          role: response.role,
          firstname: response.firstname,
          lastname: response.lastname,
          email: response.email,
          school_organization: response.school_organization,
          bio: response.bio,
          birthday: response.birthday,
          phone_number: response.phone_number,
          status: response.status,
          favorites: response.favorites,
          isVerified: response.isVerified,
          score: response.score,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
      },
    }),
    getUserFavorites: builder.query<LeaderboardUser[], string | null>({
      query: (userId) => `/user/favorites/${userId}`,
      keepUnusedDataFor: 60,
      transformResponse: (response: { favorites: LeaderboardUser[] }) => {
        return response.favorites;
      },
    }),
    search: builder.query({
      query: ({ search, filters }) => {
        const filterParams = new URLSearchParams(filters).toString();
        return `/user/search/${search}?${filterParams}`;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetLeaderboardQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useGetUserByIdQuery,
  useGetUserFavoritesQuery,
  useSearchQuery,
  useDeleteUserMutation,
} = userApiSlice;

export const selectUsersResult = userApiSlice.endpoints.getLeaderboard.select();
