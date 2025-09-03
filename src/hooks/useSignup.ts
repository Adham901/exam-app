import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth";

export function useSignup() {
  return useMutation({
    mutationFn: registerUser,
  });
}
