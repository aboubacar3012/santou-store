const env = process.env.NODE_ENV || "development";
const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://10.188.174.232:3000/api"
    : "http://localhost:3000/api";
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};
