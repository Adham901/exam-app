
import api from "@/api/axios";

export async function getSubjects() {
  const res = await api.get("/subjects");
  return res.data;
}
