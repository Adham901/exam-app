
import axios from "axios";

const api = axios.create({
  baseURL: "https://exam.elevateegy.com/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
 
  if (token) {
    config.headers.token = token;
config.headers.Authorization = token;
  
  }
  return config;
});

export default api;
