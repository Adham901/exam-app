"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">

      <div className="w-full max-w-md">
        <Button variant="outline" size="icon" className="mb-6 ml-4">
          <ArrowLeft className="h-5 w-5 " />
        </Button>
      </div>

      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader>
          <CardTitle>Create a New Password</CardTitle>
          <CardDescription>
            Create a new strong password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
    
          <div className="mb-4">
            <Label htmlFor="password" className="mb-2">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

      
          <div className="mb-6">
            <Label htmlFor="confirm" className="mb-2">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

  
          <Button className="w-full  bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
