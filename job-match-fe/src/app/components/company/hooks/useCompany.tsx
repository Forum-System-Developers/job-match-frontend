import { useState, useEffect } from "react";
import { CompanyDetails } from "@/app/components/dashboard/employ/data/company-data";
import SERVER_URL from "@/services/server";
import axios from "axios";
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
