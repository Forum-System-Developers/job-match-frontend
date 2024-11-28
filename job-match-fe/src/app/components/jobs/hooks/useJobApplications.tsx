import { useState, useEffect } from "react";
import {
  getJobApplications,
  JobApplication,
} from "../../job-application/data/job-applications-data";

export const useJobApplications = () => {
  const [jobApplications, setjobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const jobApplications = await getJobApplications();
      setjobApplications(jobApplications);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return { jobApplications, loading };
};
