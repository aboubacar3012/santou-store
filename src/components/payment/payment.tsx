import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import ContinueShoppingBtn from "../cart/continue-shopping-btn";
import { CartType } from "@/types/cart.type";
import { createPaymentIntent } from "@/services/payment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NeedToConnectComponent from "../shared/need-to-connect";

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
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    createPaymentIntent(cart).then((data) => {
      if(data.error) {
        console.log(data);
        return;
      }
      setClientSecret(data.clientSecret);
    }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if(!isAuthenticated) return (
    <NeedToConnectComponent />
  )


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
