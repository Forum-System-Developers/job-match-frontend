import { useQuery } from "@tanstack/react-query";
import { getProfessional } from "../../../../data/professional-data";

export const useProfessional = (id: string) => {
  const {
    data: professional = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => getProfessional(id),
    enabled: !!id,
  });
  return { professional, isLoading, error };
};
