import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
}

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token !== null;
  }
};

export const currentUser = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.sub;
    } catch (error) {
      console.error("Token error:", error);
      return null;
    }
  }
};

export const userRole = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.role;
    } catch (error) {
      console.error("Token error:", error);
      return null;
    }
  }
};
