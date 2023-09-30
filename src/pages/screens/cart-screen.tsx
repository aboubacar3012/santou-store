import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import CreditCardForm from "../components/cart/credit-card-form";
import { updateControl } from "@/redux/features/controlsSlice";
import { useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PiNumberOneBold } from "react-icons/pi";
import ContinueShoppingBtn from "../components/cart/continue-shopping-btn";
import { IconButton } from "@material-tailwind/react";
import PaiementMethod from "../components/cart/paiement-method";
const CartScreen = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
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
                onClick={() => dispatch(updateControl({ showCart: false }))}
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
                <li className="flex py-1">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>
                          <a href="#">Throwback Hip Bag</a>
                        </h3>
                        <p className="ml-4">$90.00</p>
                      </div>
                      <p className=" text-sm text-gray-500">Salmon</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty 1</p>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
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
                <PiNumberOneBold className="h-6 w-6" />
              </IconButton>{" "}
              Adresse de livraison
            </h2>
            <hr className="my-1" />
            <p className="pl-1">
              23 rue mathieu stilatti, 13003 Marseille, France
            </p>
            <p className="pl-1">Bat A, Appt A512</p>
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
                <PiNumberOneBold className="h-6 w-6" />
              </IconButton>{" "}
              Paiement
            </h2>
            <hr className="my-1" />
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Sous-total</p>
            <p>62.00€</p>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Frais de livraisons</p>
            <p>0€</p>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>62.00€</p>
          </div>

          <PaiementMethod />

          <div onClick={() => setStep(2)} className="mt-2">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Payer ma commande
            </a>
          </div>
          <ContinueShoppingBtn />
        </div>
      </div>
    );

  if (step === 2) return <CreditCardForm />;
};

export default CartScreen;
