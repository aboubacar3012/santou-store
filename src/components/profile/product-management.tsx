import React, { Dispatch, SetStateAction } from "react";
import OrderListComponent from "../order/order-list";

import BackButton from "../shared/back-button";
import { PageToShow } from "@/pages/screens/profile-screen";
import TabSelector from "../shared/tab-selector";
import ProductListComponent from "../product/product-list";
import AddProduct from "./add-product";

type ProductManagementProps = {
  setPageToShow: Dispatch<SetStateAction<PageToShow>>;
};
const ProductManagement = ({ setPageToShow }: ProductManagementProps) => {
  const [mode, setMode] = React.useState<"list" | "add">("list");
  return (
    <div>
      {/* Back Button */}
      <BackButton
        screenName="Profil"
        onClick={() => setPageToShow("profile" as PageToShow)}
      />
      <TabSelector
        tab1="Liste des produits"
        tab2="+ Ajouter un produit"
        handleClickTab1={() => setMode("list")}
        handleClickTab2={() => setMode("add")}
      />
      <div className="p-3 space-y-4 h-screen">
        {mode === "list" && <ProductListComponent />}
        {mode === "add" && <AddProduct />}
      </div>
    </div>
  );
};

export default ProductManagement;
