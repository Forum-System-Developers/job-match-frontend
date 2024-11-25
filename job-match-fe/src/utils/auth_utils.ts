import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";

export const setRole = async () => {
  if (typeof window !== "undefined") {
    try {
      const response = await axiosInstance.get(`http://${SERVER_URL}/auth/me`);
      localStorage.setItem("role", response.data.detail.role);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      return null;
    }
  }
};

export const role = localStorage.getItem("role")
  ? localStorage.getItem("role")
  : null;

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") ? true : false;
  }
};
