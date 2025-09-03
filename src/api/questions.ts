import api from "./axios";

export async function getQuestions(examId: string) {
  const res = await api.get(`/questions?exam=${examId}`);
  return res.data.questions; 
}
