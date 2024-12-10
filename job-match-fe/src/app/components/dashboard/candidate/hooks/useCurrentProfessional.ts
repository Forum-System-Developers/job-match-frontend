import { useQuery } from "@tanstack/react-query";

import {
  getCurrentProfessional,
  ProfessionalDetails,
} from "../../../../../data/professional-data";

export const useCurrentProfessional = () => {
  const {
    data: professional = null,
    isLoading,
    error,
  } = useQuery<ProfessionalDetails | null>({
    queryKey: ["current_professional"],
    queryFn: getCurrentProfessional,
  });

  return { professional, loading: isLoading, error };
};
