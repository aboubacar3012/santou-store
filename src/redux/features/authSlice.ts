import { GenderEnum, RoleEnum, UserType } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated: boolean;
  user: UserType | null;
  token: string | null;
};

const initialState: Auth = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state = action.payload;
      return state;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
