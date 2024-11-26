import { useState, useEffect } from "react";
import { fetchJobAds, JobAdBase } from "@/data/job-data";

export const useJobs = () => {
  const [jobAds, setJobAds] = useState<JobAdBase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const jobAds = await fetchJobAds();
      setJobAds(jobAds);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return { jobAds, loading };
};
