import { AddressType } from "@/types/address.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// import { CartType } from "@/types/cart.type";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// export const validateCart = async (cart: CartType, token: string | null) => {
//   const res = await fetch(`${API_URL}/cart/validateCart`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },

//     body: JSON.stringify(cart),
//   });

//   return res.json();
// };

export const updateAddress = async (address: AddressType, token: string | null,id?: string,) => {
  const res = await fetch(`${API_URL}/addresses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(address),
  });
  return res.json();
}