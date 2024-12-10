import { useQuery } from "@tanstack/react-query";

import { currentUser } from "@/services/auth_service";

export const useUser = () => {
  const {
    data: user = null,
    isLoading,
    error,
  } = useQuery({ queryKey: ["current_user"], queryFn: currentUser });

  return { user, isLoading, error };
};
