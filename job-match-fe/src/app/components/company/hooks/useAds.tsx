import { useState, useEffect } from "react";
import { IJobType } from "@/types/job-data-type";
import { getJobAds } from "@/data/job-data";

export const useAds = () => {
  const [ads, setAds] = useState<IJobType[]>([]);
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
