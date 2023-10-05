import { combineReducers, configureStore } from "@reduxjs/toolkit";
import controlsSlice from "./features/controlsSlice";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  controls: controlsSlice,
  cart: cartSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "afristore",
  storage,
};

// persist all slices
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
