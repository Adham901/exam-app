// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { login, LoginData } from "@/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token); // ✅ تخزين التوكن
      }
      console.log("✅ Logged in successfully:", data);
    },
    onError: (error: any) => {
      console.error("❌ Login failed:", error?.response?.data || error.message);
    },
  });
}
