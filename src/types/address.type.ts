import { UserType } from "./user.type";

export type AddressType = {
  id: string;
  country: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
};
