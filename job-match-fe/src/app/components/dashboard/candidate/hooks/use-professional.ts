import { useState, useEffect } from "react";
import { getCurrentProfessional, ProfessionalDetails } from "../data/data";

export const useProfessional = () => {
  const [professional, setProfessional] = useState<ProfessionalDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfessional = async () => {
    setLoading(true);
    try {
      const professionalData = await getCurrentProfessional();
      setProfessional(professionalData);
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
