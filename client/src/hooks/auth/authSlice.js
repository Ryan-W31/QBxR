import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    id: null,
    user: null,
    scores: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { aToken, id, user, scores } = action.payload;
      state.token = aToken;
      state.id = id;
      state.user = user;
      state.scores = scores;
    },
    logOut: (state, action) => {
      state.token = null;
      state.id = null;
      state.user = null;
      state.scores = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentId = (state) => state.auth.id;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentScores = (state) => state.auth.scores;
