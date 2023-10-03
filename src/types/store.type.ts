import { AddressType } from "./address.type";
import { OrderType } from "./order.type";
import { PaymentType } from "./payment.type";
import { ProductType } from "./product.type";
import { StoreCategoryType } from "./storeCategory.type";
import { StoreReviewType } from "./storeReview.type";
import { UserType } from "./user.type";

export type StoreType = {
  id: string;
  name: string;
  address: AddressType;
  phoneNumbers: string[];
  email: string;
  website: string;
  storeStatus: string;
  storeHours: {
    day: string;
    open: string;
    close: string;
  }[];
  storeDescription: string;
  storeLogo: string;
  storeBanner: string;
  storeRating: number;
  storeCategory: StoreCategoryType;
  owner: UserType;
  storeReviews: StoreReviewType[];
  storeProducts: ProductType[];
  storeOrders: OrderType[];
  storePayments: PaymentType[];
};
