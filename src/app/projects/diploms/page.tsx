"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DiplomasPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await api.get("/subjects");
      return res.data.subjects;
    },
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load subjects.</p>;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <div className="flex flex-col flex-1 m-3">
        <header className="bg-blue-600 text-white p-4 mx-5 flex items-center">
          <GraduationCap className="mr-2" />
          <h2 className="font-semibold text-lg">Diplomas</h2>
        </header>

        {/* Diplomas Grid */}
<div className="p-6 flex-1">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {data?.map((d: any) => (
      <Link key={d._id} href={`/projects/exams/${d._id}`}>
        <Card className="overflow-hidden shadow hover:scale-105 transition cursor-pointer ">
          <CardContent className="relative p-0 h-70 ">
           
            <Image
              src={d.icon}
              alt={d.name}
              width={400}
              height={250}
              className="object-cover  "
            />

           
            <div className="absolute bottom-0 left-0 w-90 bg-blue-600/70 ms-3 text-white text-center py-2 text-sm font-semibold backdrop-blur-sm">
              {d.name}
            </div>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
</div>



      </div>
    </div>
  );
}
