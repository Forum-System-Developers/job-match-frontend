import { useState, useEffect } from "react";
import { getJobAds, JobAdResponse } from "@/data/job-ad-data";

export const useAds = () => {
  const [ads, setAds] = useState<JobAdResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const ads = await getJobAds();
      setAds(ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return { ads, loading };
};
