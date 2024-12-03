import { IJobType } from "@/types/job-data-type";

import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import {
  CompanyDetails,
  getLogo,
} from "@/app/components/dashboard/employ/data/company-data";

export interface JobAdResponse {
  id: string;
  company_id: string;
  category_id: string;
  location_id: string;
  title: string;
  description: string;
  min_salary: number | null;
  max_salary: number | null;
  status: "active" | "archived";
  requirements: string[];
  created_at: string;
  updated_at: string;
}

export const getJobAds = async () => {
  try {
    const response = await axiosInstance.post(`${SERVER_URL}/job-ads/all`, {
      params: {
        job_ad_status: "active",
      },
    });
    const jobAdsData = response.data.detail ?? [];

    const Ads: IJobType[] = await Promise.all(
      jobAdsData.map(async (ad: any) => {
        const company = await getCompany(ad.company_id);
        const photoBlob = await getLogo(ad.company_id);
        const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

        return {
          id: ad.id,
          logo: imgUrl,
          title: ad.title,
          duration: "",
          date: ad.created_at,
          company: company?.name ?? "",
          location: "",
          category: [],
          tags: ad.requirements,
          experience: "",
          salary: ad.min_salary,
          salary_duration: "",
          english_fluency: "",
          overview: ad.description,
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
    const { data } = await axiosInstance.get(`${SERVER_URL}/companies/${id}`);
    const company = {
      id: data.detail.id,
      name: data.detail.name,
      address_line: data.detail.address_line,
      city: data.detail.city,
      description: data.detail.description,
      email: data.detail.email,
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
    const response = await axiosInstance.get(`${SERVER_URL}/job-ads/${id}`);
    const jobAdData = response.data.detail;

    const company = await getCompany(jobAdData.company_id);
    const photoBlob = await getLogo(jobAdData.company_id);
    const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

    const Ad: IJobType = {
      id: jobAdData.id,
      logo: imgUrl,
      title: jobAdData.title,
      duration: "",
      date: jobAdData.created_at,
      company: company?.name ?? "",
      location: "",
      category: [],
      tags: jobAdData.requirements,
      experience: "",
      salary: jobAdData.min_salary,
      salary_duration: "",
      english_fluency: "",
      overview: jobAdData.description,
    };

    return Ad;
  } catch (error) {
    console.error("Error fetching Ad:", error);
    return null;
  }
};
