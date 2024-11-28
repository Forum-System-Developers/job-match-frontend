import { useState, useEffect } from "react";
import { IJobType } from "@/types/job-data-type";
import { getJobAd } from "@/data/job-ad-data";

export const useAd = (id: string) => {
  const [ad, setAd] = useState<IJobType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAd = async () => {
    setLoading(true);
    try {
      const ad = await getJobAd(id);
      setAd(ad);
    } catch (error) {
      console.error("Error fetching ad:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, []);

  return { ad, loading };
};
