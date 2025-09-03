// api/logout.ts
import api from "@/api/axios";

export async function logout() {
  try {
    const res = await api.get("/auth/logout"); 
    
    localStorage.removeItem("token"); 
    return res.data;
  } catch (error: any) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
}
