import React, { Dispatch, SetStateAction } from "react";
import OrderListComponent from "../order/order-list";
import BackButton from "../shared/back-button";
import { PageToShow } from "@/pages/screens/profile-screen";
import TabSelector from "../shared/tab-selector";

type MerchantOrdersProps = {
  setPageToShow: Dispatch<SetStateAction<PageToShow>>;
};
const MerchantOrders = ({ setPageToShow }: MerchantOrdersProps) => {
  return (
    <div>
      {/* Back Button */}
      <BackButton
        screenName="Profil"
        onClick={() => setPageToShow("profile" as PageToShow)}
      />
      <OrderListComponent isAdmin={true} />
    </div>
  );
};

export default MerchantOrders;
