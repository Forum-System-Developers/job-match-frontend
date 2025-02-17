import { JobAdResponse } from "@/data/job-ad-data";

export const setSessionStorage = (name: string, item: any) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    sessionStorage.setItem(name, item);
  }
};

export const getSessionStorage = (name: string) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const data = sessionStorage.getItem(name);
    if (data) {
      return data;
    } else {
      return null;
    }
  }
  return null;
};

export const removeSessionStorage = (name: string) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    sessionStorage.removeItem(name);
  }
};
