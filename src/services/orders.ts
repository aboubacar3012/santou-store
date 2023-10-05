const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createOrder = async (order: any) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res.json();
};

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

export const updateOrderById = async (id: string, order: any) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res.json();
};
