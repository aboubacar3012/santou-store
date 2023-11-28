import { CategoryType } from "./category.type";
import { OptionType } from "./option.type";
import { UserType } from "./user.type";

export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum ProductSizeEnum {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum ProductColorEnum {
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  BLACK = "BLACK",
  WHITE = "WHITE",
}

export enum ProductGenderEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  UNISEX = "UNISEX",
}

export type ProductType = {
  id: string;
  name: string;
  slug?: string,
  category: CategoryType[];
  options: OptionType[];
  merchant?: UserType;
  description: string;
  price: number;
  size?: ProductSizeEnum;
  color?: ProductColorEnum;
  sex?: ProductGenderEnum;
  quantity?: number;
  discount: number;
  stock: number;
  status: ProductStatusEnum;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};
