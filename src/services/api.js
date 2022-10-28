import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://gridbot.com.br/api",
  // baseURL: "http://localhost:5000",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
