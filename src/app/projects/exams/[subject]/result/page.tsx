"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/api/questions";
import { PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
   const { subject } = useParams();
  

   const searchParams = useSearchParams();
    const examTitle = searchParams.get("title");

  const examId = searchParams.get("exam");
  const answersParam = searchParams.get("answers"); 
  const answers = answersParam ? JSON.parse(answersParam) : {};


  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId as string),
    enabled: !!examId,
  });

  if (isLoading) return <p className="p-6">Loading results...</p>;

  const total = questions.length;
  let correctCount = 0;

  const results = questions.map((q: any) => {
    const userAnswer = answers[q._id];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) correctCount++;
    return { ...q, userAnswer, isCorrect };
  });

  const incorrectCount = total - correctCount;

  
  const chartData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Breadcrumb */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
          <span className="hover:underline cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:underline cursor-pointer">Exams</span>
          <span>/</span>
          <span className="hover:underline cursor-pointer">{examTitle}</span>
          <span>/</span>
          <span className="text-blue-800">Questions</span>
        </div>
      </header>

      {/* Sub Header */}
      <div className="flex w-full">
        <Link
          href={`/projects/exams/${subject}`}
          className="flex items-center justify-center w-7 h-15 border ml-4 border-blue-500 text-blue-600 rounded-none"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="flex items-center bg-blue-600 text-white mx-2 px-4 w-full">
          <HelpCircle className="mr-2" size={20} />
          <span className="font-semibold">[{examTitle}] question</span>
        </div>
      </div>

      {/* Results */}
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-bold text-blue-700">Results:</h3>

        {/* Chart */}
        <div className="flex items-center space-x-6">
          <PieChart width={150} height={150}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div>
            <p className="text-green-600">✅ Correct: {correctCount}</p>
            <p className="text-red-600">❌ Incorrect: {incorrectCount}</p>
            <p className="font-semibold">
              🎯 Score: {correctCount} / {total}
            </p>
          </div>
        </div>

        {/* Answers list */}
        <div className="space-y-4">
          {results.map((q: any, i: number) => (
            <Card key={q._id}>
              <CardContent className="p-4">
                <p className="font-semibold mb-2">
                  {i + 1}. {q.question}
                </p>
                {q.answers.map((ans: any) => {
                  const isUserAnswer = q.userAnswer === ans.key;
                  const isCorrect = q.correct === ans.key;

                  return (
                    <div
                      key={ans.key}
                      className={`p-2 rounded-md mb-1 ${
                        isUserAnswer && !isCorrect
                          ? "bg-red-100 border border-red-300"
                          : isCorrect
                          ? "bg-green-100 border border-green-300"
                          : "border"
                      }`}
                    >
                      {ans.answer}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button  variant="outline" onClick={() => window.history.back()}>
            Restart
          </Button>
       
        </div>
      </div>
    </div>
  );
}
