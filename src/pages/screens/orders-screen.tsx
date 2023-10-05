import { useState } from "react";
import OrderListComponent from "../components/order/order-list";
import UnavailableComponent from "../components/unavailable";
import TabSelector from "../components/shared/tab-selector";
const OrdersScreenPage = () => {
  return (
    <>
      <OrderListComponent isAdmin={false} />
      {/* <UnavailableComponent /> */}
    </>
  );
};

export default OrdersScreenPage;
