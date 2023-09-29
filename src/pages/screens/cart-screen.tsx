import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import CreditCardForm from "../components/payment/credit-card-form";

const CartScreen = () => {
  const [step, setStep] = useState(2);
  if (step === 1)
    return (
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              Mon panier
            </h2>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr className="my-2" />
          <div className="mt-4 h-56 overflow-scroll">
            <div className="flow-root">
              <ul role="list" className=" divide-y divide-gray-200">
                <li className="flex py-2">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">Throwback Hip Bag</a>
                        </h3>
                        <p className="ml-4">$90.00</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Salmon</p>
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
                <li className="flex py-2">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                      alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">Medium Stuff Satchel</a>
                        </h3>
                        <p className="ml-4">$32.00</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Blue</p>
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
                <li className="flex py-2">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                      alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">Medium Stuff Satchel</a>
                        </h3>
                        <p className="ml-4">$32.00</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Blue</p>
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
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          {/* delivery address */}
          <div className="flex flex-col justify-between ">
            <p className="text-base flex justify-start font-medium text-gray-900">
              <BiMap className="h-6 w-6" /> Adresse de livraison
            </p>
            <p className="pl-1">
              23 rue mathieu stilatti, 13003 Marseille, France
            </p>
            <p className="pl-1">Bat A, Appt A512</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Sous-total</p>
            <p>262.00€</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Frais de livraisons</p>
            <p>0€</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>62.00€</p>
          </div>

          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Payer ma commande
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              ou
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
              >
                Continuer mes achats
                <span aria-hidden="true"> →</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    );

  if (step === 2) return <CreditCardForm />;
};

export default CartScreen;