const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImageService = async (image: File, token: string | null, restaurantSlug:string) => {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(`${API_URL}/upload?store=${restaurantSlug}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};