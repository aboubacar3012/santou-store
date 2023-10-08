import { useEffect, useState } from "react";

import OrderComponent from "./order";
import { getOrdersService } from "@/services/orders";
import { OrderType } from "@/types/order.type";
import TabSelector from "../shared/tab-selector";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type OrderListComponentProps = {
  isAdmin: boolean;
};
const OrderListComponent = ({ isAdmin }: OrderListComponentProps) => {
  const [orders, setOrders] = useState([]); // TODO: replace with [OrderType]
  const [showType, setShowType] = useState("current" as "current" | "past");
  const [statusChanged, setStatusChanged] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersService(token);
      if (response.success) {
        setOrders(response.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [showType, statusChanged]);

  let filteredOrders: OrderType[] = [];
  if (showType === "current") {
    filteredOrders = orders.filter(
      (order: OrderType) =>
        order.orderStatus === "PENDING" || order.orderStatus === "SHIPPED"
    );
  } else if (showType === "past") {
    filteredOrders = orders.filter(
      (order: OrderType) =>
        order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED"
    );
  }

  const handleClickTab1 = () => {
    setShowType("current");
  };

  const handleClickTab2 = () => {
    setShowType("past");
  };

  return (
    <>
      <TabSelector
        tab1="Commandes en cours"
        tab2="Commandes terminées"
        handleClickTab1={handleClickTab1}
        handleClickTab2={handleClickTab2}
      />
      <div
        className={`space-y-4 z-0 ${
          isAdmin ? "h-[32rem]" : "h-[36rem]"
        } overflow-y-scroll scroll-b pt-5`}
      >
        <div className="grid grid-cols-1 space-y-2  ">
          {filteredOrders &&
            filteredOrders.length > 0 &&
            filteredOrders.map((order: OrderType) => (
              <OrderComponent
                key={order.id}
                order={order}
                isAdmin={isAdmin}
                setStatusChanged={setStatusChanged}
                statusChanged={statusChanged}
              />
            ))}
          {filteredOrders.length === 0 && (
            <p className="text-center">Aucune commande</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderListComponent;
