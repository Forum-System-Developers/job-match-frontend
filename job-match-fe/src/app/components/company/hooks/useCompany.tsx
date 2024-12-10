import { useQuery } from "@tanstack/react-query";
import { getCompany } from "@/data/company-data";

export const useCompany = (id: string) => {
  const {
    data: company = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
    enabled: !!id,
  });

  return { company, isLoading, error };
};
