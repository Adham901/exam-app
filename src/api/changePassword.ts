import api from "@/api/axios";

export type ChangePasswordPayload = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

export async function changePassword(data: ChangePasswordPayload) {
  try {
    const res = await api.patch("/auth/changePassword", data);
    return res.data;
  } catch (error: any) {
    console.error("❌ changePassword error:", error.response?.data || error.message);
    throw error;
  }
}
