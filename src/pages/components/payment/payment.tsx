import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import ContinueShoppingBtn from "../cart/continue-shopping-btn";
import { CartType } from "@/types/cart.type";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type PaymentCartProps = {
  cart: CartType;
};

const Payement = ({ cart }: PaymentCartProps) => {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
      },
      body: JSON.stringify({ cart: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="p-2">
      {clientSecret && (
        <Elements
          options={{ ...options, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
      <ContinueShoppingBtn />
    </div>
  );
};

export default Payement;
