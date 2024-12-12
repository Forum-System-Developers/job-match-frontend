import { JobAdResponse } from "@/data/job-ad-data";

export const setLocalStorage = (name: string, item: any) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(name, item);
  }
};

export const getLocalStorage = (name: string) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const data = localStorage.getItem(name);
    if (data) {
      return data;
    } else {
      return null;
    }
  }
  return null;
};

export const removeLocalStorage = (name: string) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.removeItem(name);
  }
};
