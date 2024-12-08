import { CategoryResponse, getCategories } from "@/data/category-data";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading };
};
