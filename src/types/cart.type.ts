export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  gender: GenderEnum;
  avatar: string;
  role: RoleEnum;
  isActive: boolean;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryType = {
  id: string;
  name: string;
  products?: ProductType[];
  createdAt: string;
  updatedAt: string;
};

export type ProductType = {
  id: string;
  name: string;
  category: CategoryType[];
  description: string;
  price: number;
  discount: number;
  stock: number;
  status: ProductStatusEnum;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductTypeInCart = ProductType & {
  quantity: number;
};

export type CartType = {
  userId: string;
  products: ProductTypeInCart[];
  amount: number;
  deliveryCharge: number;
  totalAmount: number;
};
