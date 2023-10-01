import { configureStore } from "@reduxjs/toolkit";
import controlsSlice from "./features/controlsSlice";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    controls: controlsSlice,
    cart: cartSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
