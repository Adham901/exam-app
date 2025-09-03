"use client";

import { User, Lock, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/api/logOut";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.push("/auth/login"); 
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full p-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">Home / Account</div>

        {/* Header */}
        <div className="flex items-center space-x-2 border-b pb-3 mb-6">
          <User className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">
            Account Settings
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 border rounded-lg bg-gray-50 flex flex-col h-fit">
            <nav className="flex flex-col">
              {/* Profile */}
              <button
                onClick={() => router.push("/projects/modifyAccount/profile")}
                className={`flex items-center px-4 py-3 border-b text-sm font-medium ${
                  pathname === "/projects/modifyAccount/profile"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <User className="h-4 w-4 mr-2" /> Profile
              </button>

              {/* Change Password */}
              <button
                onClick={() =>
                  router.push("/projects/modifyAccount/changePasswordpage")
                }
                className={`flex items-center px-4 py-3 border-b text-sm font-medium ${
                  pathname === "/projects/modifyAccount/changePasswordpage"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Lock className="h-4 w-4 mr-2" /> Change Password
              </button>
            </nav>

            <div className="mt-100">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center px-4 py-3 w-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
