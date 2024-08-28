import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "../../app/store";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  user: string | null;
  scores: string | null;
}
// Slice for authentication. Contains the token, id, user, and scores.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userId: null,
    user: null,
    scores: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { accessToken, userId, user, scores } = action.payload;
      state.accessToken = accessToken;
      state.userId = userId;
      state.user = user;
      state.scores = scores;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.user = null;
      state.scores = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: IRootState) => state.auth.accessToken;
export const selectCurrentId = (state: IRootState) => state.auth.userId;
export const selectCurrentUser = (state: IRootState) => state.auth.user;
export const selectCurrentScores = (state: IRootState) => state.auth.scores;
