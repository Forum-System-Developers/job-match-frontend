import { useQuery } from "@tanstack/react-query";
import { getMatchRequestsForCompany } from "@/data/match-data";

export const useMatchRequestsCompany = () => {
  const {
    data: matchRequests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["match_requests_company"],
    queryFn: getMatchRequestsForCompany,
  });

  return { matchRequests, isLoading, error };
};
