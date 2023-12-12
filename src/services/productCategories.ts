const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getProductCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
