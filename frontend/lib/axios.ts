import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // only set Content-Type to application/json if the request data is not FormData
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject({
      status: error.response?.status,
      message:
        error.response?.data?.message ??
        error.message ??
        "Something went wrong.",
      data: error.response?.data,
    });
  },
);

export default api;
