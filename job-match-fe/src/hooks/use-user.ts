import { useState, useEffect } from "react";
import { currentUser, UserDetails } from "@/utils/auth_utils";

export const useUser = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const user = await currentUser();
      setUser(user);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
};
