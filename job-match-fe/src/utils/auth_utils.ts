import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";
import { CompanyDetails } from "@/app/components/dashboard/employ/data/company-data";
import { ProfessionalDetails } from "@/app/components/dashboard/candidate/data/professional-data";

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

export const currentUser = async (): Promise<UserDetails> => {
  if (typeof window !== "undefined" && isAuthenticated()) {
    try {
      const response = await axiosInstance.get(`http://${SERVER_URL}/auth/me`);
      const userId = response.data.detail.id;
      const role = response.data.detail.role;
      return { id: userId, role: role };
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  window.location.href = "/";
  return { id: "", role: "" };
};
