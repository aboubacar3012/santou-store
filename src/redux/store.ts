import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import controlsSlice from "./features/controlsSlice";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import filterSlice from "./features/filterSlice";

const rootReducer = combineReducers({
  controls: controlsSlice,
  cart: cartSlice,
  auth: authSlice,
  filter: filterSlice,
});

const persistConfig = {
  key: "afristore_v1.1.2",
  storage,
};

// persist all slices
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
