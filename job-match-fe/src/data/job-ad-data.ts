import axiosInstance from "@/services/axiosInstance";
import { CompanyDetails, getCompany, getLogo } from "@/data/company-data";
import { strict } from "assert";

export interface JobAdResponse {
  id: string;
  company_id: string;
  company_name: string;
  company_logo: string;
  company_website: string | null;
  category_id: string;
  category_name: string;
  city_id: string;
  city_name: string;
  title: string;
  description: string;
  min_salary: number | null;
  max_salary: number | null;
  status: "active" | "archived";
  skill_level: string;
  requirements: string[];
  created_at: string;
  updated_at: string;
}

export const getJobAds = async () => {
  try {
    const response = await axiosInstance.post(`/job-ads/all`, {
      params: {
        job_ad_status: "active",
      },
    });
    const jobAdsData = response.data.detail ?? [];

    const Ads: JobAdResponse[] = await Promise.all(
      jobAdsData.map(async (ad: any) => {
        const company = await getCompany(ad.company_id);

        return {
          id: ad.id,
          company_id: ad.company_id,
          company_name: company?.name ?? "",
          company_logo: company?.logo ?? "",
          company_website: company?.website_url ?? null,
          category_id: ad.category_id,
          category_name: ad.category_name,
          city_id: ad.city.id,
          city_name: ad.city.name,
          title: ad.title,
          description: ad.description,
          min_salary: ad.min_salary,
          max_salary: ad.max_salary,
          status: ad.status,
          skill_level: ad.skill_level,
          requirements: ad.required_skills.map((skill: any) => skill.name),
          created_at: ad.created_at,
          updated_at: ad.updated_at,
        };
      })
    );

    return Ads;
  } catch (error) {
    console.error("Error fetching Ads:", error);
    return [];
  }
};

export const getJobAd = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/job-ads/${id}`);
    const jobAdData = response.data.detail;

    const company = await getCompany(jobAdData.company_id);

    const Ad: JobAdResponse = {
      id: jobAdData.id,
      company_id: jobAdData.company_id,
      company_name: company?.name ?? "",
      company_logo: company?.logo ?? "",
      company_website: company?.website_url ?? null,
      category_id: jobAdData.category_id,
      category_name: jobAdData.category_name,
      city_id: jobAdData.city.id,
      city_name: jobAdData.city.name,
      title: jobAdData.title,
      description: jobAdData.description,
      min_salary: jobAdData.min_salary,
      max_salary: jobAdData.max_salary,
      status: jobAdData.status,
      skill_level: jobAdData.skill_level,
      requirements: jobAdData.required_skills.map((skill: any) => skill.name),
      created_at: jobAdData.created_at,
      updated_at: jobAdData.updated_at,
    };

    return Ad;
  } catch (error) {
    console.error("Error fetching Ad:", error);
    return null;
  }
};
