const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createOrderService = async (order: any) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(order),
  });

  return res.json();
};

export const getOrdersService = async (token: string | null) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // credentials: "include",
  });

  return res.json();
};

export const updateOrderByIdService = async (id: string, order: any) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(order),
  });

  return res.json();
};
