import { useState, useEffect } from "react";
import {
  getProfessional,
  ProfessionalDetails,
} from "../../dashboard/candidate/data/professional-data";

export const useProfessional = (id: string) => {
  const [professional, setProfessional] = useState<ProfessionalDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfessional = async () => {
    setLoading(true);
    try {
      const professional = await getProfessional(id);
      setProfessional(professional);
    } catch (error) {
      console.error("Error fetching professional:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessional();
  }, []);

  return { professional, loading };
};
