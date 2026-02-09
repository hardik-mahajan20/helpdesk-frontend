import axios from "axios";
import { getToken, refreshToken, logout } from "../services/auth-service";
import { API_BASE_URL } from "./endpoints";

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue all requests during refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }


    // --- Properly extract backend error messages ---
    if (axios.isAxiosError(error) && error.response?.data?.messages) {
      error.message = error.response.data.messages[0]; 
    } else if (!error.message) {
      error.message = "An unknown error occurred";
    }


    return Promise.reject(error);
  },
);

export default api;
