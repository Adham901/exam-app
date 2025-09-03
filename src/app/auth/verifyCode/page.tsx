"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { verifyResetCode } from "@/api/verifyCode"; 

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("No email found. Please start from forgot password.");
    }
  }, []);

 
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move focus
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      (nextInput as HTMLInputElement)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (!code || code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    try {
      await verifyResetCode(email, code);
      localStorage.setItem("resetEmail", email); 
      router.push("/auth/resetPassword");
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6   p-6">
        {/* Back button */}
       <Button
      variant="outline"
      onClick={() => router.push("/auth/forgetPassword")}
      className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50"
    >
      <ArrowLeft className="h-5 w-5" />
     
    </Button>

        {/* Title */}
        <h1 className="text-2xl font-bold">Verify OTP</h1>
        <p className="text-gray-600 text-sm">
          Please enter the 6-digit code we sent to:
          <br />
          <span className="font-medium">{email}</span>{" "}
          <a href="/auth/forgotpassword" className="text-blue-500 hover:underline">
            Edit
          </a>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-12 text-center text-lg"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-500">
          You can request another code in: {timer}s
        </p>

        {/* Verify Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleVerify}
        >
          Verify Code
        </Button>
      </div>
    </div>
  );
}
