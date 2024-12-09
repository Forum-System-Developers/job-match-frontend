import { useState, useEffect } from "react";
import {
  getProfessionals,
  ProfessionalDetails,
} from "@/data/professional-data";

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState<ProfessionalDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfessionals = async () => {
    setLoading(true);
    try {
      const professionals = await getProfessionals();
      setProfessionals(professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return { professionals, loading };
};
