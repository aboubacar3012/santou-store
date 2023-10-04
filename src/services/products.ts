const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};
