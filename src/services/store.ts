import { StoreType } from "@/types/store.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addRestaurantService = async (restaurant: StoreType, token: string | null) => {
  const res = await fetch(`${API_URL}/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurant),
    
  });
  return res.json();
}

export const getRestaurantByIdService = async (id: string | null) => {
  const res = await fetch(`${API_URL}/stores/${id}`);
  return res.json();
}

export const updateRestaurantByIdService = async (id: string | null, restaurant: StoreType, token: string | null) => {
  const res = await fetch(`${API_URL}/stores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurant),
  });
  return res.json();
}