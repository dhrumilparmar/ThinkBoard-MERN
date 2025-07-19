import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;