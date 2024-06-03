import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const scoreAdapter = createEntityAdapter({});
const initialState = scoreAdapter.getInitialState();

export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setVRScore: builder.mutation({
      query: (body) => ({
        url: `/score/setvrscore/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    setWebScore: builder.mutation({
      query: (body) => ({
        url: `/score/setwebscore/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    getVRScore: builder.query({
      query: (id) => `/score/getvrscore/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        var vrData = [];
        if (response?.vr_reaction)
          vrData.push({ title: "Reaction Test", score: response.vr_reaction });
        if (response?.vr_playid)
          vrData.push({
            title: "Play Identification",
            score: response.vr_playid,
          });
        if (response?.vr_defense)
          vrData.push({ title: "Defense Reading", score: response.vr_defense });
        if (response?.vr_crit)
          vrData.push({ title: "Critical Thinking", score: response.vr_crit });
        return vrData;
      },
    }),
    getWebScore: builder.query({
      query: (id) => `/score/getwebscore/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (response) => {
        var webData = [];
        if (response?.web_reaction)
          webData.push({
            title: "Reaction Test",
            score: response.web_reaction,
          });
        if (response?.web_playid)
          webData.push({
            title: "Play Identification",
            score: response.web_playid,
          });
        if (response?.web_defense)
          webData.push({
            title: "Defense Reading",
            score: response.web_defense,
          });
        if (response?.web_crit)
          webData.push({
            title: "Critical Thinking",
            score: response.web_crit,
          });
        return webData;
      },
    }),
  }),
});

export const {
  useSetVRScoreMutation,
  useSetWebScoreMutation,
  useGetVRScoreQuery,
  useGetWebScoreQuery,
} = scoreApiSlice;
