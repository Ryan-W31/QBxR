import { apiSlice } from "../../app/api/apiSlice";
import { authApiSlice } from "../auth/authApiSlice";

// Score API slice. This slice contains the getScores, setVRScore, setWebScore, getVRScore, getWebScore, and getQBxRScore endpoints.
export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query({
      query: (userId) => `/score/get/all/${userId}`,
      transformResponse: (response) => {
        return response;
      },
    }),
    setVRScore: builder.mutation({
      query: (body) => ({
        url: `/score/set/vr`,
        method: "PATCH",
        body: { ...body },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApiSlice.endpoints.refresh.initiate());
          console.log("VR score updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    setWebScore: builder.mutation({
      query: (body) => ({
        url: `/score/set/web`,
        method: "PATCH",
        body: { ...body },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApiSlice.endpoints.refresh.initiate());
          console.log("Web score updated");
        } catch (err) {
          console.error("Error updating user info:", err);
        }
      },
    }),
    getVRScore: builder.query({
      query: (userId) => `/score/get/vr/${userId}`,
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
    getWebScore: builder.query({
      query: (userId) => `/score/get/web/${userId}`,
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
    getQBxRScore: builder.query({
      query: (userId) => `/score/get/qbxr/${userId}`,
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetScoresQuery,
  useSetVRScoreMutation,
  useSetWebScoreMutation,
  useGetVRScoreQuery,
  useGetWebScoreQuery,
  useGetQBxRScoreQuery,
} = scoreApiSlice;
