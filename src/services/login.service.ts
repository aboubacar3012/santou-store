const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;

export const loginService = async (loginInfo: {
  email: string;
  password: string;
}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  const data = await res.json();
  return data;
};
