import { useState } from "react";
import OrderListComponent from "../../components/order/order-list";
import UnavailableComponent from "../../components/unavailable";
import TabSelector from "../../components/shared/tab-selector";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NeedToConnectComponent from "@/components/shared/need-to-connect";
const OrdersScreenPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if(!isAuthenticated)
  return <NeedToConnectComponent />
  
  return (
      <OrderListComponent isAdmin={false} />
  );
 
};

export default OrdersScreenPage;
