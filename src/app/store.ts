// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { productApi } from "../features/product/productApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (gDM) => gDM().concat(authApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
