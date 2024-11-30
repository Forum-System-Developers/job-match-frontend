import { useState, useEffect } from "react";
import { getProfessionals } from "@/data/candidate-data";
import { ICandidate } from "@/data/candidate-data";

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState<ICandidate[]>([]);
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
