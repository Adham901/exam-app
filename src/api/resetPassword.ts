// src/api/resetPassword.ts
import api from "./axios";

export const resetPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  const response = await api.put("/auth/resetPassword", {
    email,
    newPassword,
  });
  return response.data;
};
