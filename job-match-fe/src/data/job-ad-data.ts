import axiosInstance from "@/services/axiosInstance";
import {
  CompanyDetails,
  getLogo,
} from "@/app/components/dashboard/employ/data/company-data";
import { strict } from "assert";

export interface JobAdResponse {
  id: string;
  company_id: string;
  company_name: string;
  company_logo: string;
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
        const photoBlob = await getLogo(ad.company_id);
        const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

        return {
          id: ad.id,
          company_id: ad.company_id,
          company_name: company?.name ?? "",
          company_logo: imgUrl,
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

export const getCompany = async (
  id: string
): Promise<CompanyDetails | null> => {
  try {
    const { data } = await axiosInstance.get(`/companies/${id}`);
    const company = {
      id: data.detail.id,
      name: data.detail.name,
      address_line: data.detail.address_line,
      city: data.detail.city,
      description: data.detail.description,
      email: data.detail.email,
      website_url: data.detail.website_url,
      youtube_video_id: data.detail.youtube_video_id,
      phone_number: data.detail.phone_number,
      active_job_ads: data.detail.active_job_ads,
      successful_matches: data.detail.successful_matches,
    };
    return company;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const getJobAd = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/job-ads/${id}`);
    const jobAdData = response.data.detail;

    const company = await getCompany(jobAdData.company_id);
    const photoBlob = await getLogo(jobAdData.company_id);
    const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

    const Ad: JobAdResponse = {
      id: jobAdData.id,
      company_id: jobAdData.company_id,
      company_name: company?.name ?? "",
      company_logo: imgUrl,
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
