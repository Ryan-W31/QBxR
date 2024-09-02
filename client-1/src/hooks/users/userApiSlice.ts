import { apiSlice } from "../../app/api/apiSlice";
import { authApiSlice } from "../auth/authApiSlice";

interface LeaderboardUser {
  userId: string;
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
  birthday: string;
  phone_number: string;
  status: boolean;
  favorites: string[];
}

type LeaderboardResponse = LeaderboardUser[];
// User API slice. This slice contains the signUp, getLeaderboard, updateUserInfo, updateUserPassword, getUserById, and getUserFavorites endpoints.
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...body },
      }),
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
        url: `/user/updateinfo/${body.userId}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApiSlice.endpoints.refresh.initiate());
          console.log("User info updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    updateUserPassword: builder.mutation({
      query: (body) => ({
        url: `/user/updatepassword/${body.userId}`,
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
      query: (userId) => `/user/${userId}`,
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
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetLeaderboardQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useGetUserByIdQuery,
  useGetUserFavoritesQuery,
  useSearchQuery,
  useDeleteUserMutation,
} = userApiSlice;

export const selectUsersResult = userApiSlice.endpoints.getLeaderboard.select();
