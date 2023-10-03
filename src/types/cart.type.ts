import { ProductType } from "./product.type";

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
