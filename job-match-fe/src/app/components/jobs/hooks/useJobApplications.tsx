import { useState, useEffect } from "react";
import {
  getJobApplications,
  JobApplication,
} from "../../../../data/job-applications-data";
import { getJobApplicationsForProfessional } from "@/data/professional-data";
import { currentUser } from "@/utils/auth_utils";

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

export const useJobApplicationsProfessional = () => {
  const [jobApplications, setjobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const user = await currentUser();
      const id = user.id;
      const jobApplications = await getJobApplicationsForProfessional(id);
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
