import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (!config.headers) {
    config.headers = new axios.AxiosHeaders();
  }

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");

        const res = await axiosInstance.post("/auth/refresh", {
          refreshToken,
          expiresInMins: 30,
        });

        const newToken = res.data.accessToken;

        Cookies.set("token", newToken);

        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };
