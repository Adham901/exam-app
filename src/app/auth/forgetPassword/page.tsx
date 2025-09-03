"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { forgotPassword } from "@/api/forgetPassword";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      await forgotPassword(email);
      localStorage.setItem("resetEmail", email); 
      router.push("/auth/verifyCode"); 
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardContent className="space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-gray-500">
            Don’t worry, we will help you recover your <br /> account.
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Continue →
          </Button>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
                <Link href="/auth/register" className="text-blue-500">
                Create yours
              </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
