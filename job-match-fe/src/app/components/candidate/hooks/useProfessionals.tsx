import { useQuery } from "@tanstack/react-query";
import {
  getProfessionals,
  ProfessionalDetails,
} from "@/data/professional-data";

export const useProfessionals = () => {
  const {
    data: professionals = [],
    isLoading,
    error,
  } = useQuery<ProfessionalDetails[]>({
    queryKey: ["professionals"],
    queryFn: getProfessionals,
  });

  return { professionals, isLoading, error };
};
