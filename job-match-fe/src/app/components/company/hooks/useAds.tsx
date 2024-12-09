import { useState, useEffect } from "react";
import { getJobAds, JobAdResponse } from "@/data/job-ad-data";
import { getAdsCompany } from "../../../../data/company-data";

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

export const useAdsCompany = (id: string) => {
  const [ads, setAds] = useState<JobAdResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAds = async (id: string) => {
    setLoading(true);
    try {
      const ads = await getAdsCompany(id);
      setAds(ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(id);
  }, [id]);

  return { ads, loading };
};
