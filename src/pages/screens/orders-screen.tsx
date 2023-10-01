import { useState } from "react";
import OrderListComponent from "../components/order/order-list";
import UnavailableComponent from "../components/unavailable";
import TabSelector from "../components/shared/tab-selector";
const OrdersScreenPage = () => {
  return (
    <>
      <TabSelector
        tab1="Commandes en cours"
        tab2="Commandes terminées"
        handleClickTab1={() => {}}
        handleClickTab2={() => {}}
      />
      <OrderListComponent />
      {/* <UnavailableComponent /> */}
    </>
  );
};

export default OrdersScreenPage;
