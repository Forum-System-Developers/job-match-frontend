import { useState, useEffect } from "react";
import {
  CompanyDetails,
  getAllCompanies,
} from "../../dashboard/employ/data/company-data";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const companies = await getAllCompanies();
      setCompanies(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, loading };
};
