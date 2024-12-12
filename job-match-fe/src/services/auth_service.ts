import CryptoJS from "crypto-js";
import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";
import { error } from "console";
import { AxiosError } from "axios";

export type IFormData = {
  username: string;
  password: string;
};

const encryptData = (data: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Secret key is not provided.");
  }
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (data: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Secret key is not provided.");
  }
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setUser = async (): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Failed to fetch user details.");
    }
    const encrypted = encryptData(JSON.stringify(user));
    localStorage.setItem("user", encrypted);
    return true;
  } catch (error) {
    throw new Error(
      `Failed to set role due to an error: ${(error as any).message}`
    );
  }
};

export const setGoogleUser = (id: string): boolean => {
  if (typeof window !== "undefined") {
    try {
      const user = { id: id, role: "professional" };
      const encrypted = encryptData(JSON.stringify(user));
      localStorage.setItem("user", encrypted);
      return true;
    } catch (error) {
      throw new Error(
        `Failed to set role due to an error: ${(error as any).message}`
      );
    }
  }
  return false;
};

export const login = async (data: IFormData): Promise<boolean> => {
  try {
    await axiosInstance.post(`/auth/login`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const roleSet = await setUser();
    if (!roleSet) {
      throw new Error("Role was not set in localStorage after login.");
    }
    return true;
  } catch (error) {
    alert(`Login or role setting failed: ${error}`);
    return false;
  }
};

export const role = (): string => {
  if (typeof window === "undefined") {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const decrypted = JSON.parse(decryptData(user));
        return decrypted.role;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return "";
      }
    }
    return "";
  }
  return "";
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
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

export const getUserLocal = (): UserDetails | null => {
  if (typeof window !== "undefined") {
    const user_info = localStorage.getItem("user");
    const user = user_info ? JSON.parse(decryptData(user_info)) : null;
    return user;
  }
  return null;
};

export const currentUser = async (): Promise<UserDetails> => {
  if (typeof window !== "undefined") {
    try {
      const response = await axiosInstance.get(`/auth/me`);

      const userId = response.data.detail.id;
      const role: string = response.data.detail.role;
      const user = { id: userId, role: role };
      return user;
    } catch (error: any) {
      throw error;
    }
  }
  return { id: "", role: "" };
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post(`/auth/logout`);
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
