import React, { useEffect, useState } from "react";
import ProductComponent from "./product";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import { ProductType } from "@/types/product.type";
import { BsSortUp, BsSortUpAlt } from "react-icons/bs";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const ProductListComponent = ({category, products}:any) => {
  // const [products, setProducts] = useState([]);
  const [displayType, setDisplayType] = useState<"vertical" | "horizontal">(
    "horizontal"
  );

  const handleDisplayType = (type: "vertical" | "horizontal") => {
    setDisplayType(type);
  };

  const horizontalStyle = "flex items-center justify-start overflow-y-scroll";
  const verticalStyle =
    "grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full";

  if (products && products.length > 0)
    return (
      <div>
        <div className="bg-gray-200 py-4 px-2 -mx-2">
        <h4 className="font-semibold text-2xl">Nos {category}</h4>
        <hr className="" />
        </div>
        <div
          className="flex w-full flex-col items-center justify-start overflow-y-scroll"
        >
          {products.map((product: ProductType) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
};

export default ProductListComponent;
