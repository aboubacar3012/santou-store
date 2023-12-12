import { StoreType } from "./store.type";
import { UserType } from "./user.type";

export type StoreReviewType = {
  id: string;
  store: StoreType;
  user: UserType;
  rating: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
};
