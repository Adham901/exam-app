import api from "@/api/axios";

export async function deleteAccount() {
  try {
    const response = await api.delete("/auth/deleteMe");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}
