import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";

export const setRole = async () => {
  if (typeof window !== "undefined") {
    try {
      const user = await getUser();
      localStorage.setItem("role", user.role);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      return null;
    }
  }
};

export const role =
  typeof window !== "undefined" && localStorage.getItem("role")
    ? localStorage.getItem("role")
    : null;

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") ? true : false;
  }
};

export interface UserDetails {
  id: string;
  role: string;
}

const getUser = async (): Promise<UserDetails> => {
  try {
    const response = await axiosInstance.get(`${SERVER_URL}/auth/me`);
    const userId = response.data.detail.id;
    const role: string = response.data.detail.role;
    return { id: userId, role: role };
  } catch (error) {
    console.log(error);
    return { id: "", role: "" };
  }
};

export const currentUser = async (): Promise<UserDetails> => {
  if (typeof window !== "undefined" && isAuthenticated()) {
    try {
      const response = await axiosInstance.get(`${SERVER_URL}/auth/me`);
      const userId = response.data.detail.id;
      const role: string = response.data.detail.role;
      return { id: userId, role: role };
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  window.location.href = "/";
  return { id: "", role: "" };
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post(`${SERVER_URL}/auth/logout`);
    localStorage.removeItem("role");
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
