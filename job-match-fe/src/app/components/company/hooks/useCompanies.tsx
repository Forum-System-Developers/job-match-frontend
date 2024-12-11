import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/data/company-data";

export const useCompanies = () => {
  const {
    data: companies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all_companies"],
    queryFn: getAllCompanies,
  });

  return { companies, isLoading, error };
};
