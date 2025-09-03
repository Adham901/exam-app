
import api from "./axios";

export const registerUser = async (data: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};


export interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const res = await api.post("/auth/signin", data);
  return res.data; 
}