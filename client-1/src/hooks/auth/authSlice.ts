import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "../../app/store";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    status: boolean;
    role: string;
    school_organization: string;
    bio: string;
    birthday: string;
    phone_number: string;
    score: number;
    isVerified: boolean;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
  } | null;
  scores: {
    qbxr: { qbxr_score: number; rank: number };
    web: { title: string; score: number }[];
    vr: { title: string; score: number }[];
  } | null;
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
