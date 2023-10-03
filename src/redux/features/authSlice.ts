import { GenderEnum, RoleEnum, UserType } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated: boolean;
  user: UserType;
};

const initialState: Auth = {
  isAuthenticated: false,
  user: {
    firstName: "Aboubacar",
    lastName: "Doe",
    email: "abou.doe@example.com",
    dateOfBirth: "1985-05-20",
    phone: "123-456789",
    gender: GenderEnum.UNKNOWN,
    avatar: "https://example.com/avatar1.jpg",
    role: RoleEnum.USER,
    isActive: true,
    address: {
      id: "65160bd16f17038b4e5d65f4",
      number: "123",
      street: "123 Main Street",
      city: "New York",
      zipCode: "10001",
      country: "USA",
      complement: "Apt 123",
      createdAt: "2023-09-28T23:19:38.790Z",
      updatedAt: "2023-09-28T23:19:38.790Z",
    },
    createdAt: "2023-09-28T23:19:38.790Z",
    updatedAt: "2023-09-28T23:19:38.790Z",
    id: "65160bd16f17038b4e5d65f4",
  },
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
