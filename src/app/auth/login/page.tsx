"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login, LoginData } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation"; 

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // ✅

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Login mutation
  const mutation = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (data) => {
      console.log("🔑 Login response:", data);

    
      const token = data?.token || data?.access_token;
      const user = data?.user;

      if (token) {
        localStorage.setItem("token", token);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user)); 
        }
        setError(null);

        router.push("/projects/diploms"); 
      } else {
        setError("⚠️ No token found in response");
      }
    },
    onError: (err: any) => {
      console.error("❌ Login failed:", err);
      setError(err?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-none">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-bold">Login</h2>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
              <Link
                href="/auth/forgetPassword"
                className="text-sm text-blue-500 mt-1 inline-block"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-500">
                Create yours
              </Link>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
