import { useState, useEffect } from "react";
import { getJobAd, JobAdResponse } from "@/data/job-ad-data";

export const useAd = (id: string) => {
  const [ad, setAd] = useState<JobAdResponse | null>(null);
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
