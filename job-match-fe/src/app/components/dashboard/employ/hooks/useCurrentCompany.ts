import { useQuery } from "@tanstack/react-query";
import { getCurrentCompany } from "../../../../../data/company-data";

export const useCurrentCompany = () => {
  const {
    data: company = null,
    isLoading,
    error,
  } = useQuery({ queryKey: ["current_user"], queryFn: getCurrentCompany });

  return { company, isLoading, error };
};
