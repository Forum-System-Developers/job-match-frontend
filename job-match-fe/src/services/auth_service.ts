import CryptoJS from "crypto-js";
import SERVER_URL from "@/services/server";
import axiosInstance from "@/services/axiosInstance";
import { AxiosError } from "axios";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localstorage";
import { get } from "http";

export type IFormData = {
  username: string;
  password: string;
};

const encryptData = (data: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (data: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setUser = async (): Promise<boolean> => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const user = await currentUser();
      if (!user) {
        throw new Error("Error getting user");
      }
      const encrypted = encryptData(JSON.stringify(user));
      setLocalStorage("user", encrypted);
      return true;
    } catch (error) {
      throw new Error("Error setting user");
    }
  }
  return false;
};

export const setGoogleUser = (id: string): boolean => {
  try {
    const user = { id: id, role: "professional" };
    const encrypted = encryptData(JSON.stringify(user));
    setLocalStorage("user", encrypted);
    return true;
  } catch (error) {
    throw new Error("Error setting user");
  }
};

export const login = async (data: IFormData): Promise<boolean> => {
  try {
    await axiosInstance.post(`/auth/login`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const roleSet = await setUser();
    if (!roleSet) {
      throw new Error("Error setting role");
    }
    return true;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

export const role = (): string => {
  const user = getLocalStorage("user");

  if (user) {
    try {
      const decrypted = JSON.parse(decryptData(user));
      return decrypted.role;
    } catch (error) {
      throw new Error("Error getting role");
    }
  }
  return "";
};

export const isAuthenticated = (): boolean => {
  if (getLocalStorage("user")) {
    return true;
  }
  return false;
};

export interface UserDetails {
  id: string;
  role: string;
}

export const getUserLocal = (): UserDetails | null => {
  const user_info = getLocalStorage("user");
  const user = user_info ? JSON.parse(decryptData(user_info)) : null;
  return user;
};

export const currentUser = async (): Promise<UserDetails> => {
  try {
    const response = await axiosInstance.get(`/auth/me`);
    const userId = response.data.detail.id;
    const role: string = response.data.detail.role;
    const user = { id: userId, role: role };
    return user;
  } catch (error: any) {
    throw new Error("Error getting user");
  }
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post(`/auth/logout`);
    removeLocalStorage("user");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    throw new Error("Error logging out");
  }
};

export const getUser = async (): Promise<UserDetails | null> => {
  try {
    const response = await axiosInstance.get(`/auth/me`);
    const userId = response.data.detail.id;
    const role: string = response.data.detail.role;
    const user = { id: userId, role: role };
    return user;
  } catch (error) {
    throw new Error("Error getting user");
  }
};

export const setRole = async (): Promise<boolean> => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("Error getting user");
    }
    setLocalStorage("role", user.role);
    return true;
  } catch (error) {
    throw new Error("Error setting role");
  }
};
