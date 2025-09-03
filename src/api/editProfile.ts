import api from "./axios";

export async function editProfile(data: any) {
  try {
    const res = await api.put("/auth/editProfile", data);
    return res.data;
  } catch (error: any) {
    console.error("❌ editProfile error:", error.response?.data || error.message);
    throw error;
  }
}
