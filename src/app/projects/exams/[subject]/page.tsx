"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ExamsBySubjectPage() {
  const { subject } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["exams", subject],
    queryFn: async () => {
      const res = await api.get(`/exams?subject=${subject}`);
      return res.data.exams;
    },
    enabled: !!subject,
  });

  if (isLoading) return <p className="p-6">Loading exams...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load exams.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
          <span className="hover:underline cursor-pointer">Home</span>
          <span>/</span>
          <span className="text-blue-800">Exams</span>
        </div>
      </header>

      <div className="flex w-full">
      
        <Link
          href="/projects/diploms"
          className="flex items-center justify-center w-7 h-15 border ml-4 border-blue-500 text-blue-600 rounded-none"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="flex items-center bg-blue-600 text-white mx-2 px-4 w-full">
          <BookOpen className="mr-2" size={20} />
          <span className="font-semibold">Exams</span>
        </div>
      </div>

      <div className="flex-1 p-6">
        {data?.length ? (
          <div className="space-y-4">
            {data.map((exam: any) => (
              <Link
                key={exam._id}
                href={{
    pathname: `/projects/exams/${subject}/quiz`,
    query: {
      exam: exam._id,
      title: exam.title,  
    }
  }}
                
              >
                <Card className="py-0 cursor-pointer">
                  <CardContent className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm hover:shadow-md transition">
                    <div>
                      <h3 className="font-semibold text-blue-600">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Questions: {exam.numberOfQuestions}
                      </p>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      ⏱ Duration: {exam.duration} minutes
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No exams found for this subject.</p>
        )}
      </div>
    </div>
  );
}
