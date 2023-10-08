import React, { useEffect, useState } from "react";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Button,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateControl } from "@/redux/features/controlsSlice";
import { useRouter } from "next/router";

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter()

  // // si je clique dehors je ferme le menu
  // useEffect(() => {
  //   const closeMenu = () => setOpen(false);
  //   window.addEventListener("click", closeMenu);
  //   return () => window.removeEventListener("click", closeMenu);
  // }, [open]);

  console.log(router)

  if (cart.products.length === 0 || router.pathname === "/screens/cart-screen" || router.pathname === "/payment-validation-screen") return null;

  return (
    <div className="fixed bottom-28 right-5">
      <SpeedDial open={open} placement="right">
        <SpeedDialHandler
          onClick={() => {
            setOpen(!open);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          }}
        >
          <IconButton size="lg" className="rounded-full opacity-90">
            <div className="flex flex-col justify-end items-center">
              <span className="-mb-3 text-red-500 text-xl">
                {cart.products.length}
              </span>
              <GiShoppingCart className="w-8 h-8" />
            </div>
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction
            onClick={() => {
              dispatch(updateControl({ showCart: true }));
              router.push("/screens/cart-screen");
            }}
            className="bg-blue-gray-50 px-5"
          >
            {/* <HomeIcon className="h-5 w-5" /> */}
            <span>Ouvrir mon panier </span>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
};

export default CartButton;
