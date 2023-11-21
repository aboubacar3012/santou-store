import { UserType } from "./user.type";

export type AddressType = {
  addressName: string | null;
  isDefault: boolean;
  userId?:string;
  id?: string;
  country: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  createdAt?: string;
  updatedAt?: string;
};
