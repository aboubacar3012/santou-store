import React, { useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { RiSecurePaymentFill } from "react-icons/ri";
import NotificationMessage from "../shared/notification-message";
import { RootState } from "@/redux/store";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const loading = useSelector((state: RootState) => state.controls.values.spinner);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch()
  const selectedAddress = user?.addresses[0]; // A corriger


  // useEffect(() => {
  //  if(!loading)
  //   dispatch(updateControl({ spinner: true }))
  //   else dispatch(updateControl({ spinner: false }))

  // }, [loading]);
  

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  // hide div with class="p-Grid p-BillingAddressForm u-mt-grid"
  useEffect(() => {
    const billingAddressForm = document.querySelector(
      ".p-Grid.p-BillingAddressForm.u-mt-grid"
    );
    if (billingAddressForm) {
      billingAddressForm.classList.add("hidden");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    dispatch(updateControl({ spinner: true }))

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // add order details for the PaymentIntent
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-validation-screen`,
        payment_method_data: {
          billing_details: {
            email: user?.email,
            phone: user?.phone,
            name: user?.firstName + " " + user?.lastName,
            address: {
              line1: selectedAddress?.number + " " + selectedAddress?.street,
              postal_code: selectedAddress?.zipCode,
              city: selectedAddress?.city,
              state: selectedAddress?.city,
              country: "FR",
            },
          },
        },
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      // console.log(error, "error stripe apple pay")
      setMessage(JSON.stringify(error));
    }

    dispatch(updateControl({ spinner: false }))
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={loading || !stripe || !elements} id="submit"></button>
      <button
         onClick={() => {
          dispatch(updateControl({ showCart: false }))
          
        }}
        className="mt-2 flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm"
        disabled={loading || !stripe || !elements}
        id="submit"
      >
        <a href="#" className="flex justify-center  ">
          <span id="button-text">
            {loading ? (
              <div
                className="spinner px-2 flex space-x-3"
                id="spinner"
              >
                <span>Paiement en cours</span> <Spinner className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center">
                Payer ma commande
                <RiSecurePaymentFill className="w-8 h-8 px-2" />
              </div>
            )}
          </span>
        </a>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <NotificationMessage
          color="light-blue"
          message={message}
          setErrorMessage={setMessage}
        />
      )}
    </form>
  );
}
