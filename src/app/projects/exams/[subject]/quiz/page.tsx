"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getQuestions } from "@/api/questions";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
  const { subject } = useParams();
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam");
  const examTitle = searchParams.get("title");
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});


  const questionTime = 60; 
  const [timeLeft, setTimeLeft] = useState(questionTime);

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId as string),
    enabled: !!examId,
  });

 
  useEffect(() => {
    setTimeLeft(questionTime);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        handleNext(); 
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
 
  }, [currentIndex]);


  const questions = data || [];
  const total = questions.length || 1;
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

const handleNext = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  } else {
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
    router.push(
      `/projects/exams/${subject}/result?exam=${examId}&title=${examTitle}&answers=${encodedAnswers}`
    );
  }
};


  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percentage = (timeLeft / questionTime) * 100;


  if (!examId) {
    return (
      <p className="p-6 text-red-500">
        Missing exam id. Open quiz from its exam card.
      </p>
    );
  }

  if (isLoading) {
    return <p className="p-6">Loading questions...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to load questions.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
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

      {/* Header + Progress */}
      <div className="sticky top-0 z-10 bg-white border-b p-4">
        <h2 className="text-lg font-bold text-blue-700 mb-2">
          Question {Math.min(currentIndex + 1, total)} of {questions.length}
        </h2>
        <Progress
          value={(Math.min(currentIndex + 1, total) / total) * 100}
          className="w-full h-2 [&>div]:bg-blue-600 transition-all duration-500"
        />
      </div>

      {/* Question */}
      <div className="flex-1 p-6 flex flex-col">
        <Card className="flex-1 flex flex-col shadow-none border-0">
          <CardContent className="p-0 flex flex-col justify-between h-full">
            <p className="text-xl font-semibold text-blue-700 mb-6">
              {currentQuestion?.question}
            </p>

            <RadioGroup
              value={(currentQuestion && answers[currentQuestion._id]) || ""}
              onValueChange={(val) =>
                currentQuestion && handleAnswer(currentQuestion._id, val)
              }
              className="space-y-3"
            >
              {currentQuestion?.answers.map((ans: any) => {
                const inputId = `${currentQuestion._id}-${ans.key}`;
                return (
                  <div
                    key={ans.key}
                    className="flex items-center space-x-2 p-4 border rounded-md hover:bg-gray-50"
                  >
                    <RadioGroupItem value={ans.key} id={inputId} />
                    <Label
                      htmlFor={inputId}
                      className="text-gray-700 cursor-pointer"
                    >
                      {ans.answer}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8">
          {/* Previous */}
          <Button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            variant="outline"
            className="w-100 h-12 bg-gray-300 hover:bg-gray-400 text-base"
          >
            Previous
          </Button>

          {/* Timer Circle */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="28"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="28"
                stroke="#2563eb"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - percentage / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="font-bold text-blue-600">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Next */}
          <Button
            onClick={handleNext}
            className="w-100 h-12 bg-blue-600 hover:bg-blue-700 text-base"
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
