const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getStoreCategories = async () => {
  const res = await fetch(`${API_URL}/storeCategories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const addStoreCategoryService = async (categoryName:string, token: string | null) => {
  const res = await fetch(`${API_URL}/storeCategories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name:categoryName, icon:"icon.png"}),
    
  });
  return res.json();
}