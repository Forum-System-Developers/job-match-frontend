import { getMatchRequestsForProfessional } from "@/data/match-data";
import { useQuery } from "@tanstack/react-query";

export const useMatchRequests = () => {
  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["match_requests_for_professional"],
    queryFn: getMatchRequestsForProfessional,
  });

  return { requests, isLoading, error };
};
