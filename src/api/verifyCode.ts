import api from "./axios";

export const verifyResetCode = async (email: string, resetCode: string) => {
  try {
    const res = await api.post("/auth/verifyResetCode", { email, resetCode });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Verification failed");
  }
};
