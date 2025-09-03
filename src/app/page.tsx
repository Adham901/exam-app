"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // ⏳ بعد 2.5 ثانية نودّي المستخدم للـ login
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-5xl font-extrabold tracking-widest text-blue-800"
      >
        ELEVATE
      </motion.h1>
    </div>
  );
}
