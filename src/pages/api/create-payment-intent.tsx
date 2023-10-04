import { NextApiRequest, NextApiResponse } from "next";

// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1500;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body;

  try {
    // const paymentMethodOrder =
    //   process.env.NODE_ENV === "production"
    //     ? ["apple_pay", "google-pay", "card"]
    //     : ["card"];
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
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
