import { useQuery } from "@tanstack/react-query";
import { getProfessional } from "../../../../data/professional-data";

export const useProfessional = (id: string) => {
  const {
    data: professional,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["professional", id],
    queryFn: ({ queryKey }) => getProfessional(queryKey[1]),
    enabled: !!id, // This ensures the query runs only if `id` is truthy
  });
  return { professional, isLoading, error };
};
