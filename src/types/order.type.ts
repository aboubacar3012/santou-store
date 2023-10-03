import { AddressType } from "./address.type";
import { ProductType } from "./product.type";
import { UserType } from "./user.type";

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum OrderStatusEnum {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type OrderType = {
  user: UserType;
  products: ProductType[];
  orderDate: string;
  totalAmount: number;
  paymentStatus: PaymentStatusEnum;
  orderStatus: OrderStatusEnum;
  deliveryAddress: AddressType;
  createdAt: string;
  updatedAt: string;
};
