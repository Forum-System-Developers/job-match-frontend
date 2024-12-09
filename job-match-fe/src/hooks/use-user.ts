import { useQuery } from "@tanstack/react-query";

import { currentUser } from "@/utils/auth_utils";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({ queryKey: ["user"], queryFn: currentUser });

  return { user, loading: isLoading, error };
};
