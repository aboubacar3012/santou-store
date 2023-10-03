import React, { useEffect, useState } from "react";
import ProductComponent from "./product";
import { generate50Products } from "@/docs/generateProduct";

const productList = generate50Products();
const ProductListComponent = () => {
  return (
    <div>
      {/* <div className="grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full "> */}
      <div className="p-3 space-y-4 z-0 h-[38rem] overflow-y-scroll scroll-b">
        <div className="grid grid-cols-2 gap-2  gap-x-2">
          {productList.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
