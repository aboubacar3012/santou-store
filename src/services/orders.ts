const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const createOrderService = async (order: any, token: string | null) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const getOrderByIdService = async (token: string | null, orderId:string) => {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


export const updateOrderByIdService = async (
  id: string,
  order: any,
  token: string | null
) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // credentials: "include",
    body: JSON.stringify(order),
  });

  return res.json();
};
