import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import {
  getJobApplications,
  getJobApplication,
  JobApplication,
} from "../../../../data/job-applications-data";
import {
  getJobApplicationsForProfessional,
  getMatchedApplicationsForProfessional,
} from "@/data/professional-data";
import { currentUser } from "@/services/auth_service";

export const useJobApplications = () => {
  const [jobApplications, setjobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const jobApplications = await getJobApplications();
      setjobApplications(jobApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { jobApplications, loading };
};

export const useJobApplicationsProfessional = (id: string) => {
  const {
    data: jobApplications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job_applications_professional", id],
    queryFn: () => getJobApplicationsForProfessional(id),
    enabled: !!id,
  });

  return { jobApplications, isLoading, error };
};

export const useMatchedApplicationsProfessional = (id: string) => {
  const {
    data: matchedApplications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matched_applications_professional", id],
    queryFn: () => getMatchedApplicationsForProfessional(id),
    enabled: !!id,
  });

  return { matchedApplications, isLoading, error };
};

export const useJobApplication = (id: string) => {
  const [jobApplication, setjobApplication] = useState<JobApplication | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const jobApplication = await getJobApplication(id as string);
      setjobApplication(jobApplication);
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return { jobApplication, loading };
};
