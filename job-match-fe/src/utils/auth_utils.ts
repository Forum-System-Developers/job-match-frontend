import SERVER_URL from "@/services/server";
import axios from "axios";

export const setRole = async () => {
  if (typeof window !== "undefined") {
    try {
      const response = await axios.get(`http://${SERVER_URL}/auth/me`, {
        withCredentials: true,
      });
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
