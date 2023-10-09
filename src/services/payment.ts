import { CartType } from "@/types/cart.type";

const url = `${process.env.NEXT_PUBLIC_API_URL}/payments`;
// const url = `/api/create-payment-intent`;

// Create PaymentIntent as soon as the page loads
export const createPaymentIntent = async (cart:CartType) => {
  const res = await fetch(`${url}/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
    },
    body: JSON.stringify({ cart }),
  });
  return res.json();
}