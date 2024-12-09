import { useState, useEffect } from "react";
import { CompanyDetails } from "@/data/company-data";
import axiosInstance from "@/services/axiosInstance";

export const useCompany = (id: string) => {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/companies/${id}`);
      const {
        name,
        address_line,
        city,
        description,
        email,
        website_url,
        youtube_video_id,
        phone_number,
        active_job_ads,
        successful_matches,
      } = data.detail ?? {};

      const company = {
        id: id,
        name,
        address_line,
        city,
        description,
        email,
        website_url,
        youtube_video_id,
        phone_number,
        active_job_ads,
        successful_matches,
      };
      setCompany(company);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return { company, loading };
};
