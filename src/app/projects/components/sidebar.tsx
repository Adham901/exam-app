// components/Sidebar.tsx
"use client";

import { GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ firstName?: string; email?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("❌ Failed to parse user:", e);
      }
    }
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-50 flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold mb-6">
          <span className="text-blue-600">ELEVATE</span>
        </h1>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link href="/projects/diploms">
            <Button
              variant={pathname === "/projects/diploms" ? "outline" : "ghost"}
              className={`w-full justify-start ${
                pathname === "/projects/diploms" ? "border-blue-400 bg-white" : ""
              }`}
            >
              <GraduationCap
                className={`mr-2 h-5 w-5 ${
                  pathname === "/projects/diploms" ? "text-blue-600" : "text-gray-600"
                }`}
              />
              Diplomas
            </Button>
          </Link>

          <Link href="/projects/modifyAccount/profile">
            <Button
              variant={pathname === "/projects/modifyAccount/profile" ? "outline" : "ghost"}
              className={`w-full justify-start ${
                pathname === "/projects/modifyAccount/profile" ? "border-blue-400 bg-white" : ""
              }`}
            >
              <Settings
                className={`mr-2 h-5 w-5 ${
                  pathname.startsWith("/projects/modifyAccount") ? "text-blue-600" : "text-gray-600"
                }`}
              />
              Account Settings
            </Button>
          </Link>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-2 p-2 border-t pt-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">
            {user?.firstName || "Guest"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.email || "no-email@example.com"}
          </p>
        </div>
      </div>
    </aside>
  );
}
