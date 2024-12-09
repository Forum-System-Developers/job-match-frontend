import { City, getCities } from "@/data/city_data";
import { useQuery } from "@tanstack/react-query";

export const useCities = () => {
  const {
    data: cities = [],
    isLoading,
    error,
  } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities, loading: isLoading, error };
};
