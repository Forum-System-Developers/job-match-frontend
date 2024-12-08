import axiosInstance from "@/services/axiosInstance";

export interface CategoryResponse {
  id: string;
  title: string;
  description: string;
  job_ads_count: number;
  job_applications_count: number;
}

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories/`);
    const categoriesData = response.data.detail ?? [];

    const categories: CategoryResponse[] = await Promise.all(
      categoriesData.map(async (cat: any) => {
        return {
          id: cat.id,
          title: cat.title,
          description: cat.description,
          job_ads_count: cat.job_ads_count,
          job_applications_count: cat.job_applications_count,
        };
      })
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
