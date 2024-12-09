import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";

export type IFormData = {
  username: string;
  password: string;
};

export const setRole = async (): Promise<boolean> => {
  if (typeof window !== "undefined") {
    try {
      const user = await getUser();
      if (!user) {
        throw new Error("Failed to fetch user details.");
      }
      localStorage.setItem("role", user.role);
      return true;
    } catch (error) {
      console.error("Failed to set role due to an error:", error);
      return false;
    }
  }
  return false;
};

export const login = async (data: IFormData): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response.status === 200) {
      const roleSet = await setRole();
      if (!roleSet) {
        throw new Error("Role was not set in localStorage after login.");
      }
      return true;
    } else {
      throw new Error(`Error: ${response.data}`);
    }
  } catch (error) {
    alert(`Login or role setting failed: ${error}`);
    return false;
  }
};

export const role: string | null =
  typeof window !== "undefined" && localStorage.getItem("role")
    ? localStorage.getItem("role")
    : null;

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("role")) {
      return true;
    }
    return false;
  }
  return false;
};

export interface UserDetails {
  id: string;
  role: string;
}

export const getUser = async (): Promise<UserDetails | null> => {
  try {
    const response = await axiosInstance.get(`/auth/me`);
    const userId = response.data.detail.id;
    const role: string = response.data.detail.role;
    const user = { id: userId, role: role };
    return user;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }
};

export const currentUser = async (): Promise<UserDetails> => {
  if (typeof window !== "undefined" && isAuthenticated()) {
    try {
      const response = await axiosInstance.get(`/auth/me`);
      const userId = response.data.detail.id;
      const role: string = response.data.detail.role;
      const user = { id: userId, role: role };
      return user;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return { id: "", role: "" };
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post(`/auth/logout`);
    localStorage.removeItem("role");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
