import { useQuery } from "@tanstack/react-query";
import { getPhoto } from "../../../../../data/professional-data";

export const usePhoto = (id: string) => {
  const {
    data: photoUrl = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhoto(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { photoUrl, loading: isLoading, error };
};
