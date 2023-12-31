import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import CreditCardForm from "../../components/cart/credit-card-form";
import { updateControl } from "@/redux/features/controlsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
} from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiApplepay } from "react-icons/si";
import { BsCreditCard2Front } from "react-icons/bs";
import ContinueShoppingBtn from "../../components/cart/continue-shopping-btn";
import { IconButton } from "@material-tailwind/react";
import PaiementMethod from "../../components/cart/paiement-method";

import { clearCart, removeFromCart } from "@/redux/features/cartSlice";
import {isAuthenticated} from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import Payement from "../../components/payment/payment";
import { ProductType } from "@/types/product.type";
import { CartType } from "@/types/cart.type";
import { validateCart } from "@/services/cart";
import { useRouter } from "next/router";
import Toast from "@/components/shared/toast";
import { formatPrice } from "@/utils/formatPrice";
const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user;
  const isAuth = auth.isAuthenticated;
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"cash" | "credit-card">(
    "credit-card"
  );
  const token = useSelector((state: RootState) => state.auth?.token);
  const router = useRouter();
  const selectedAddress = user?.addresses[0]; // A corriger
  const takingOrder = auth.takingOrder;
  const timeToPickup = auth.timeToPickup;

  const handleShowConfirm = () => {
    const confirm = window.confirm("Vous devez vous connecter pour valider votre commande");
      if (confirm) {
        dispatch(isAuthenticated(false))
        return router.push("/auth/login");
      }
  }

  const handleValidateCart = async (cart: CartType, token: string | null) => {
    if(!cart.userId || !isAuth) return handleShowConfirm()
    const finalCart = {
      ...cart,
     takingOrder,
      timeToPickup,
    };
    const response = await validateCart(finalCart, token);
    if (response.success) {
      if(method === "cash"){
        dispatch(updateControl({ showPaymentDrawer: false }))
        router.push("/screens/paiement-cash-complete-screen");
        dispatch(clearCart());
      }
      else if(method === "credit-card"){
        setStep(2);
      localStorage.setItem("orderId", response.data.id);
      return;
      }
    } else if (response.error && response.status === 401){
     return handleShowConfirm();
    }else 
      {
        alert("Une erreur s'est produite, veillez réprendre votre commande")
        dispatch(clearCart());
        return router.push("/screens/home-screen");
      }
  };

  console.log(cart.products)
  

  // empty cart
  if (!cart.products.length)
    return (
      <div className="flex flex-col justify-center items-center h-72">
        <h1 className="text-2xl font-bold text-center">
          Votre panier est vide
        </h1>
        <ContinueShoppingBtn />
      </div>
    );

  if (step === 1)
    return (
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              <IconButton
                size="sm"
                className="rounded-full mr-2 bg-red-500"
                color="blue"
              >
                <PiNumberOneBold className="h-6 w-6" />
              </IconButton>
              Mon panier
            </h2>
            {/* close button */}
            <div className="ml-3 flex h-7 items-center">
              <button
                onClick={() => router.back()}
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <AiOutlineCloseCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          <hr className="my-1" />
          {/* product */}
          <div className="mt-2 h-44 overflow-scroll">
            <div className="flow-root">
              <ul role="list" className=" divide-y divide-gray-200">
                {cart && cart.products &&
                  cart.products.map((product: ProductType) => (
                    <li className="flex py-1" key={product.name}>
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.images[0]}
                          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>
                              <a href="#">{product.name}</a>
                            </h3>
                            <p className="ml-4">
                              {product.quantity &&
                               formatPrice(product.price * product.quantity)
                               }
                            </p>
                          </div>
                          {/* <p className=" text-sm text-gray-500">
                            {product.category.map((cat) => cat.name).join(", ")}
                          </p> */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Quantité: {product.quantity}
                          </p>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => dispatch(removeFromCart(product))}
                            >
                              <RiDeleteBin6Line className="h-6 w-6 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
          {/* delivery address */}
          <div className="flex flex-col justify-between ">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              <IconButton
                size="sm"
                className="rounded-full mr-2 bg-yellow-500"
                color="blue"
              >
                <PiNumberTwoBold className="h-6 w-6" />
              </IconButton>{" "}
              Adresse de livraison
            </h2>
            <hr className="my-1" />
            {selectedAddress&& (
              <div>
                <p className="pl-1">
                  {selectedAddress?.number} {selectedAddress?.street}
                  <br />
                  {selectedAddress?.zipCode} {selectedAddress?.city},{" "}
                  {selectedAddress?.country}
                </p>
                <p className="pl-1">{selectedAddress?.complement}</p>
              </div>
            )}
            {!selectedAddress && (
              <div className="flex items-center">
                <button className="ml-2">
                  <BiMap className="h-6 w-6" />
                </button>
                <p className="pl-1">Aucune adresse de livraison</p>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
          <div className="flex flex-col justify-between ">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              <IconButton
                size="sm"
                className="rounded-full mr-2 bg-green-500"
                color="blue"
              >
                <PiNumberThreeBold className="h-6 w-6" />
              </IconButton>{" "}
              Paiement
            </h2>
            <hr className="my-1" />
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Sous-total</p>
            <p>{formatPrice(cart.amount)}</p>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Frais de livraisons</p>
            {/* <p>Offert</p> */}
            <p>{formatPrice(cart.deliveryCharge)}</p>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>{formatPrice(cart.amount + cart.deliveryCharge)}</p>
          </div>

          {/* <PaiementMethod method={p} setMethod={setMethod} /> */}
          <div
            onClick={() => {
              handleValidateCart(cart, token);
            }}
            className="mt-5"
          >
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {/* <BsCreditCard2Front className="w-8 h-8" /> */}
              <span className="px-2">
                Valider mon panier
              </span>
            </a>
          </div>

          {/* {method === "credit-card" && (
            <div onClick={() => setStep(2)} className="mt-2">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                <BsCreditCard2Front className="w-8 h-8" />
                <span className="px-2">Payer ma commande</span>
              </a>
            </div>
          )}
          {method === "cash" && (
            <div
              onClick={() =>
                alert(
                  "Le paiement avec apple pay n'est pas disponible pour le moment, ressayez plus tard"
                )
              }
              className="mt-2"
            >
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                <SiApplepay className="w-8 h-8" />
                <span className="px-2">Payer ma commande</span>
              </a>
            </div>
          )} */}
          <ContinueShoppingBtn />
        </div>
      </div>
    );

  // if (step === 2) return <CreditCardForm />;
  if (step === 2) return <Payement cart={cart} />;
};

export default CartScreen;
