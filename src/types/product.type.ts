import { CategoryType } from "./category.type";
import { UserType } from "./user.type";

export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type ProductType = {
  id: string;
  name: string;
  category: CategoryType[];
  merchant?: UserType;
  description: string;
  price: number;
  discount: number;
  stock: number;
  status: ProductStatusEnum;
  images: string[];
  createdAt: string;
  updatedAt: string;
};
