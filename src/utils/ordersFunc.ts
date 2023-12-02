import { OrderType } from "@/types/order.type";

export const getOpenValueStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 1;
    case 'SHIPPED':
      return 2;
    case 'DELIVERED':
      return 3;
    case 'CANCELLED':
      return 4;
    default:
      return 0;
  }
};

export const getColorByType = (type: string) => {
  switch (type) {
    case 'DELIVERY ':
      return 'green';
    case 'PICKUP':
      return 'orange';
  }
};

export const getOrdersByStatus = (status: string, orders:OrderType[]) => {
  return orders.filter((order) => order.orderStatus === status);
};