const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getStoreSpecialities = async () => {
  const res = await fetch(`${API_URL}/storeSpecialities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const addStoreSpecialityService = async (SpecialityName:string, token: string | null) => {
  const res = await fetch(`${API_URL}/storeSpecialities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name:SpecialityName, icon:"icon.png"}),
    
  });
  return res.json();
}