import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    id: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { aToken, id } = action.payload;
      state.token = aToken;
      state.id = id;
    },
    logOut: (state, action) => {
      state.token = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentId = (state) => state.auth.id;
