import api from "@/api/axios";

export async function getExams(subjectId?: string) {
  const url = subjectId ? `/exams?subject=${subjectId}` : "/exams";
  const res = await api.get(url);
  return res.data.exams;
}
