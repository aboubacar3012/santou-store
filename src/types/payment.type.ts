import { OrderType } from "./order.type";
import { UserType } from "./user.type";

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export type PaymentType = {
  id: string;
  user: UserType;
  order: OrderType;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: PaymentStatusEnum;
  paymentDate: string;
  createdAt?: string;
  updatedAt?: string;
};
