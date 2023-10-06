import { RegisterType } from "@/types/auth.type";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const loginService = async (loginInfo: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  const data = await res.json();
  return data;
};

export const registerService = async (registerInfo: RegisterType) => {
  const res = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  });
  const data = await res.json();
  return data;
};
