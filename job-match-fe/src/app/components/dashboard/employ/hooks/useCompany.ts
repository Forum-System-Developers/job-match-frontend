import { useState, useEffect } from "react";
import { CompanyDetails, getCurrentCompany } from "../data/data";

export const useCompany = () => {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEmployer = async () => {
    setLoading(true);
    try {
      const company = await getCurrentCompany();
      setCompany(company);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployer();
  }, []);

  return { company, loading };
};
