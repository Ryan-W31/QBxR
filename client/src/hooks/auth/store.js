import { configureStore } from "@reduxjs/toolkit";
import { api } from "./auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
