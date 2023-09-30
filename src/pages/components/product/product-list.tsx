import React from "react";
import ProductComponent from "./product";

const ProductListComponent = () => {
  return (
    <div>
      <h4 className="font-semibold">Nos Produits</h4>
      <div className="grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full ">
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
      </div>
    </div>
  );
};

export default ProductListComponent;
