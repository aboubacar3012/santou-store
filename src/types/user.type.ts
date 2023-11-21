import { AddressType } from "./address.type";
import { StoreType } from "./store.type";

export enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  MERCHANT = "MERCHANT",
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export type UserType = {
  store?: StoreType;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  gender: GenderEnum;
  avatar: string;
  password?: string;
  role: RoleEnum;
  isActive: boolean;
  addresses: AddressType[];
  createdAt: string;
  updatedAt: string;
};
