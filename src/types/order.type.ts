import { AddressType } from "./address.type";
import { ProductType } from "./product.type";
import { UserType } from "./user.type";

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum OrderStatusEnum {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum TakingOrderEnum {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}


export type OrderType = {
  id: string;
  user: UserType;
  takingOrder: TakingOrderEnum;
  timeToPickup: {
    now: boolean;
    day: string;
    period: string;
  };
  products: ProductType[];
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  paymentStatus: PaymentStatusEnum;
  orderStatus: OrderStatusEnum;
  deliveryAddress: AddressType;
  createdAt?: string;
  updatedAt?: string;
};
