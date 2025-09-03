"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "@/api/resetPassword";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found, please try again");
    }
  }, []);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (!email) {
        setError("Email not found, please try again");
        return;
      }

    
      await resetPassword({
        email,
        newPassword: password,
      });

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6 border border-dashed border-blue-400 p-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Title + Description */}
        <h1 className="text-2xl font-bold">Create a New Password</h1>
        <p className="text-gray-600 text-sm">
          Create a new strong password for your account.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* New Password */}
        <div className="relative">
          <label className="text-sm font-medium">New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="text-sm font-medium">Confirm New Password</label>
          <Input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-8 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Update Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Update Password
        </Button>
      </div>
    </div>
  );
}
