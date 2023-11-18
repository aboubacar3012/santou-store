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

  const horizontalStyle = "flex items-center justify-between overflow-y-scroll";
  const verticalStyle =
    "grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full";

  if (products && products.length > 0)
    return (
      <div>
        {/* <div className="grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full "> */}
        {/* <div className="p-3 space-y-4 z-0 h-[36rem]  overflow-y-scroll scroll-b"> */}
        {/* afficher en horizontal  avec un sroll */}
        {/* <div className="grid grid-cols-2 gap-2  gap-x-2"> */}
        {displayType === "horizontal" ? (
          <div className="flex justify-between items-center">
          <h4 className="font-semibold">{category}</h4>
          <button onClick={() => handleDisplayType("vertical")} className="flex justify-center items-center text-sm font-semibold text-gray-500 hover:text-gray-700">
            Voir tout
            <BiSortDown className="h-6 w-6" />
          </button>
        </div>
        ) : (
          <div className="flex justify-between items-center">
          <h4 className="font-semibold">{category}</h4>
          <button onClick={() => handleDisplayType("horizontal")} className="flex justify-center items-center text-sm font-semibold text-gray-500 hover:text-gray-700">
            Reduire 
            <BiSortUp className="h-6 w-6" />
          </button>
        </div>
        )}
        <hr className="" />
        <div
          className={
            displayType === "vertical" ? verticalStyle : horizontalStyle
          }
        >
          {products.map((product: ProductType) => (
            <ProductComponent key={product.id} product={product} />
          ))}
          {/* </div> */}
        </div>
      </div>
    );
};

export default ProductListComponent;
