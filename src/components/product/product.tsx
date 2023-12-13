import React, { useState } from "react";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import ProductDetails from "./product-details";
import { ProductType } from "@/types/product.type";
import { Button } from "@material-tailwind/react";
import { truncateText } from "@/utils/truncate-text";
import { formatPrice } from "@/utils/formatPrice";
import { ProductDetailsDrawer } from "./product-details-drawer";

interface ProductProps {
  product: ProductType;
}

const isMerchant = false;

const ProductComponent = ({ product }: ProductProps) => {
  const [showProduct, setShowProduct] = useState(false);
  const handleShow = () => {
    if (product.status === "INACTIVE")
      alert("Ce produit n'est pas disponible en ce moment");
    else setShowProduct(!showProduct);
  };

  if (!product) return <p>Loading</p>;

  return (
    <div>
      <div  onClick={handleShow} className="flex  w-full justify-between items-center py-2">
        <div className="flex flex-col w-[16rem]">
          <p className="font-bold">{truncateText(product.name, 16)}</p>
          <p className="font-light text-sm">
            {truncateText(product.description, 65)}
          </p>
          <p className="font-semibold">{formatPrice(product.price)}</p>
        </div>
        <div className="flex gap-1">
          <img
            src={product.images[0]}            alt=""
            className="w-20 h-16 rounded-2xl"
          />
          <p className="border p-2 flex justify-center items-center text-green-500">
            +
          </p>
        </div>
      </div>
        <hr/>
     
      {/* Ancienne version */}
      {/* {product && showProduct && (
        <ProductDetails
          handleShow={handleShow}
          showProduct={showProduct}
          product={product}
          isMerchant={isMerchant}
        />
      )} */}
      {/* Nouvelle version */}
      <ProductDetailsDrawer
        handleShow={handleShow}
        open={showProduct}
        setOpen={setShowProduct}
        product={product}
        isMerchant={isMerchant}
      />
    </div>
  );
};

export default ProductComponent;
