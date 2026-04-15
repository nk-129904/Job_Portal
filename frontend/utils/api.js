import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true // 🔥 VERY IMPORTANT
});

// ❌ REMOVE interceptor (no need now)
// API.interceptors.request.use(...)

export default API;