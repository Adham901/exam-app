"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/changePassword";
import { useRouter } from "next/navigation"; 

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Current password is too short"),
    password: z.string().min(6, "New password must be at least 6 chars"),
    rePassword: z.string().min(6, "Confirm password must be at least 6 chars"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const router = useRouter(); 

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: PasswordFormValues) => changePassword(data),
    onSuccess: () => {
      alert("✅ Password updated successfully");
      form.reset();
      router.push("/auth/login"); 
    },
    onError: (error: any) => {
      console.log("❌ API Error:", error?.response?.data);
      alert(
        "❌ Failed to update password: " +
          (error?.response?.data?.message || "Unknown error")
      );
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <Input type="password" {...form.register("oldPassword")} />
        {form.formState.errors.oldPassword && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.oldPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <Input type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <Input type="password" {...form.register("rePassword")} />
        {form.formState.errors.rePassword && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.rePassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
