import { GenderEnum, RoleEnum, UserType } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated: boolean;
  takingOrder: "delivery" | "pickup" | null;
  deliveryAddress: {
    number: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  } | null;
  timeToPickup: {
    now:boolean;
    day: string | null;
    period: string | null;
  } | null;

  user: UserType | null;
  token: string | null;
};

type LoginPayload = {
  isAuthenticated: boolean;
  user: UserType;
  token: string;
};

const initialState: Auth = {
  isAuthenticated: false,
  takingOrder: null,
  deliveryAddress:null,
  timeToPickup: {
    now: true,
    day: null,
    period: null,
  },
  user: null,
  token: null,
};



export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
      return state;
    },
    logout: () => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      return state;
    },
    isAuthenticated: (state, action:PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      return state;
    },
    updateTakingOrder: (state, action:PayloadAction<"delivery" | "pickup" | null>) => {
      state.takingOrder = action.payload;
      return state;
    },
    updateTimeToPickup: (state, action:PayloadAction<{now:boolean,day:string | null,period:string | null}>) => {
      state.timeToPickup = action.payload;
      return state;
    }
  },
});

export const { login, logout, isAuthenticated,updateTakingOrder,updateTimeToPickup,updateUser } = authSlice.actions;

export default authSlice.reducer;
