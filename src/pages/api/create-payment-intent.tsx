import { CartType } from "@/types/cart.type";
import { NextApiRequest, NextApiResponse } from "next";

// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const calculateCartAmount = (cart: CartType) => {
  let amount = 0;
  cart.products.map((product) => {
    product.quantity && (amount += product.price * product.quantity);
  });
  return (amount * 100).toFixed(0);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cart } = req.body;

  try {
    // const paymentMethodOrder =
    //   process.env.NODE_ENV === "production"
    //     ? ["apple_pay", "google-pay", "card"]
    //     : ["card"];
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateCartAmount(cart),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
