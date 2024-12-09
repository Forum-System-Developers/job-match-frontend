import { CategoryResponse, getCategories } from "@/data/category-data";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories, loading: isLoading, error };
};
