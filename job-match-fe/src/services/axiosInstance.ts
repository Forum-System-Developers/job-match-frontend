import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import SERVER_URL from "@/services/server";

interface RefreshTokenResponse {
  refresh_token: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `http://${SERVER_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
