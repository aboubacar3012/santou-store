import { ProductType } from "./product.type";
import { OptionType } from "./option.type";

// export type ProductTypeInCart = ProductType & {
//   quantity: number;
// };

export type CartType = {
  userId: string;
  products: ProductType[];
  amount: number;
  deliveryCharge: number;
  totalAmount: number;
  indication:string;
  options: OptionType[]
};
