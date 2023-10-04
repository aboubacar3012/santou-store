import React, { useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { RiSecurePaymentFill } from "react-icons/ri";
import NotificationMessage from "../shared/notification-message";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState<string | undefined | null>();
  const [isLoading, setIsLoading] = React.useState(false);

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

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // add order details for the PaymentIntent
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-success`,
        payment_method_data: {
          billing_details: {
            email: "abou@diallo.com",
            phone: "+33600000000",
            name: "Jenny Rosen",
            address: {
              line1: "510 Townsend St",
              postal_code: "98140",
              city: "San Francisco",
              state: "CA",
              country: "US",
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
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit"></button>
      <button
        className="mt-2 flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <a href="#" className="flex items-center justify-center  ">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner px-2" id="spinner"></div>
            ) : (
              "Payer ma commande"
            )}
          </span>
          <RiSecurePaymentFill className="w-8 h-8 px-2" />
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
