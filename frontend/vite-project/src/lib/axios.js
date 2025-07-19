import axios from "axios";

// In production, use relative path since frontend and backend are served from same domain
const BASE_URL = import.meta.env.MODE === "production" ? "/api" : "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;