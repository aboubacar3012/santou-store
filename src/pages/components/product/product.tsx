import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import ProductDetails from "./product-details";
import { ProductType } from "@/types/product.type";

interface ProductProps {
  product: ProductType;
}

const isMerchant = true;

const ProductComponent = ({ product }: ProductProps) => {
  const [showProduct, setShowProduct] = useState(false);
  const handleShow = () => setShowProduct(!showProduct);

  if (!product) return <p>Loading</p>;

  return (
    <>
      <div
        onClick={handleShow}
        className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
      >
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img src={product.images[0]} alt="ui/ux review check" />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
        </div>
        <div className="p-1">
          <div className="flex flex-col items-center justify-between">
            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
              {product.name}
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              Prix: {product.price} €
            </p>
            {!isMerchant && (
              <button
                className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true"
              >
                <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                  <AiOutlineHeart className="h-6 w-6" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {product && showProduct && (
        <ProductDetails
          handleShow={handleShow}
          showProduct={showProduct}
          product={product}
          isMerchant={isMerchant}
        />
      )}
    </>
  );
};

export default ProductComponent;
