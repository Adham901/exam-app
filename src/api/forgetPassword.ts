import api from "./axios";

export const forgotPassword = async (email: string) => {
  if (!email) throw new Error("Email is required");
  try {
    const res = await api.post("/auth/forgotPassword", { email });
    console.log("forgotPassword response:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("forgotPassword error:", err.response || err.message);
    throw err.response?.data || { message: "Something went wrong" };
  }
};
