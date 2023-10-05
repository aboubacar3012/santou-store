import { useEffect, useState } from "react";

import OrderComponent from "./order";
import { getOrders } from "@/services/orders";
import { OrderType } from "@/types/order.type";

type OrderListComponentProps = {
  isAdmin: boolean;
};
const OrderListComponent = ({ isAdmin }: OrderListComponentProps) => {
  const [orders, setOrders] = useState([]); // TODO: replace with [OrderType]

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      if (response.success) {
        setOrders(response.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders && orders.length === 0)
    return (
      <div className="flex items-center justify-center h-[38rem]">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-2xl font-bold">Aucune commande</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-3 space-y-4 z-0 h-[38rem] overflow-y-scroll scroll-b">
      <div className="grid grid-cols-1 space-y-2  ">
        {orders &&
          orders.length > 0 &&
          orders.map((order: OrderType) => (
            <OrderComponent key={order.id} order={order} isAdmin={isAdmin} />
          ))}
      </div>
    </div>
  );
};

export default OrderListComponent;
