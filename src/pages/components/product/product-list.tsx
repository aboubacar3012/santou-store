import React, { useEffect, useState } from "react";
import ProductComponent from "./product";
import { generate50Products } from "@/docs/generateProduct";
import { ProductType } from "@/types/cart.type";

const ProductListComponent = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    const products = generate50Products();
    setProductList(products);
  }, []);
  return (
    <div>
      <h4 className="font-semibold">Nos Produits</h4>
      <div className="grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full ">
        {productList.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListComponent;
