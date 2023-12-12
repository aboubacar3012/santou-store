import { AddressType } from "./address.type";
import { OrderType } from "./order.type";
import { PaymentType } from "./payment.type";
import { ProductType } from "./product.type";
import { StoreCategoryType } from "./storeCategory.type";
import { StoreReviewType } from "./storeReview.type";
import { StoreSpecialityType } from "./storeSpeciality.type";
import { UserType } from "./user.type";

export enum StoreStatusEnum {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum DayEnum {
  Lundi = "Lundi",
  Mardi = "Mardi",
  Mercredi = "Mercredi",
  Jeudi = "Jeudi",
  Vendredi = "Vendredi",
  Samedi = "Samedi",
  Dimanche = "Dimanche",
}

export type StoreType = {
  id?: string;
  storeOwner?: UserType | string;
  name: string;
  slug: string;
  address?: AddressType;
  latitude?: number;
  longitude?: number;
  phoneNumbers?: string[];
  email?: string;
  website?: string;
  storeStatus?: StoreStatusEnum;
  storeHours?: {
    day: DayEnum;
    open: string;
    close: string;
    isActive?: boolean;
  }[];
  storeDescription?: string;
  storeLogo?: string;
  storeBanner?: string;
  storeRating?: number;
  storeCategories?: StoreCategoryType[] | string[];
  storeSpecialities?: StoreSpecialityType[] | string[];
  storeReviews?: StoreReviewType[];
  isActive?:boolean;
  createdAt?: string;
  updatedAt?: string;
};
