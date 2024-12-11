import Image, { StaticImageData } from "next/image";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_39.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_39_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_9 from "@/assets/dashboard/images/icon/icon_40.svg";
import nav_9_active from "@/assets/dashboard/images/icon/icon_40_active.svg";
import { currentUser, getUserLocal } from "@/services/auth_service";
import axios from "axios";
import axiosInstance from "@/services/axiosInstance";
import { JobAdResponse } from "@/data/job-ad-data";
import { log } from "console";

// nav data
export const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/employ-dashboard",
    title: "Dashboard",
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/employ-dashboard/match-requests",
    title: "Match Requests",
  },
  // {
  //   id: 4,
  //   icon: nav_4,
  //   icon_active: nav_4_active,
  //   link: "/dashboard/employ-dashboard/messages",
  //   title: "Messages",
  // },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/employ-dashboard/jobs",
    title: "Job Ads",
  },
  // {
  //   id: 7,
  //   icon: nav_9,
  //   icon_active: nav_9_active,
  //   link: "/dashboard/employ-dashboard/membership",
  //   title: "Membership",
  // },
];

export interface CompanyDetails {
  id: string;
  name: string;
  address_line: string;
  city: string;
  description: string;
  email: string;
  logo: string | null;
  phone_number: string;
  website_url: string;
  youtube_video_id: string;
  active_job_ads: number;
  successful_matches: number;
}

interface CompanyUpdate {
  name: string | null;
  address_line: string | null;
  city: string | null;
  description: string | null;
  email: string | null;
  phone_number: string | null;
  website_url: string | null;
  youtube_video_id: string | null;
}

export const getCurrentCompany = async (): Promise<CompanyDetails | null> => {
  const user = getUserLocal();
  try {
    const { data } = await axiosInstance.get(`/companies/${user?.id}`);
    const imgUrl = await getLogo(user?.id as string);

    const company = {
      id: user?.id || "",
      name: data.detail.name,
      address_line: data.detail.address_line,
      city: data.detail.city,
      description: data.detail.description,
      logo: imgUrl,
      email: data.detail.email,
      phone_number: data.detail.phone_number,
      website_url: data.detail.website_url,
      youtube_video_id: data.detail.youtube_video_id,
      active_job_ads: data.detail.active_job_ads,
      successful_matches: data.detail.successful_matches,
    };
    return company;
  } catch (error) {
    throw new Error("An error occurred:" + error);
    return null;
  }
};

export const getLogo = async (id: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.get<Blob>(
      `/companies/${id}/download-logo`,
      { responseType: "blob" }
    );
    const photoUrl = URL.createObjectURL(response.data);
    return photoUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const uploadLogo = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("logo", file);

    const response = await axiosInstance.post(
      `/companies/upload-logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Logo uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading logo:", error);
  } finally {
    window.location.href = "/dashboard/employ-dashboard/profile";
  }
};

export const getAllCompanies = async (): Promise<CompanyDetails[]> => {
  try {
    const response = await axiosInstance.get(`/companies/`);
    const companiesData: CompanyDetails[] = response.data.detail ?? [];

    const companies: CompanyDetails[] = await Promise.all(
      companiesData.map(async (company: any) => {
        return {
          id: company.id,
          name: company.name,
          address_line: company.address_line,
          city: company.city,
          description: company.description,
          email: company.email,
          logo: company.logo,
          phone_number: company.phone_number,
          website_url: company.website_url,
          youtube_video_id: company.youtube_video_id,
          active_job_ads: company.active_job_ads,
          successful_matches: company.successful_matches,
        };
      })
    );
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};

export const getCompany = async (
  id: string
): Promise<CompanyDetails | null> => {
  try {
    const { data } = await axiosInstance.get(`/companies/${id}`);
    const imgUrl = await getLogo(id);

    const company = {
      id: id,
      name: data.detail.name,
      address_line: data.detail.address_line,
      city: data.detail.city,
      description: data.detail.description,
      logo: imgUrl,
      email: data.detail.email,
      phone_number: data.detail.phone_number,
      website_url: data.detail.website_url,
      youtube_video_id: data.detail.youtube_video_id,
      active_job_ads: data.detail.active_job_ads,
      successful_matches: data.detail.successful_matches,
    };
    return company;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const getAdsCompany = async (
  id: string
): Promise<JobAdResponse[] | []> => {
  try {
    const response = await axiosInstance.post(`/job-ads/all`, {
      job_ad_status: "active",
      company_id: id,
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
          city: ad.city.name,
          title: ad.title,
          description: ad.description,
          min_salary: ad.min_salary,
          max_salary: ad.max_salary,
          status: ad.status,
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

export const updateCompany = async (data: CompanyUpdate) => {
  try {
    await axiosInstance.put(`/companies/`, data);
  } catch (error) {
    throw new Error("An error occurred:" + error);
  }
};
