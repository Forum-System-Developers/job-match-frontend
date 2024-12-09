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
import { currentUser } from "@/utils/auth_utils";

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
    queryKey: ["jobApplications", id],
    queryFn: ({ queryKey }) =>
      getJobApplicationsForProfessional(queryKey[1] as string),
    enabled: !!id,
  });

  return { jobApplications, isLoading, error };
};

export const useMatchedApplicationsProfessional = (id: string) => {
  const [matchedApplications, setjobApplications] = useState<JobApplication[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplications = async (id: string) => {
    try {
      const jobApplications = await getMatchedApplicationsForProfessional(id);
      setjobApplications(jobApplications);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchApplications(id);
    }
  }, [id]);

  return { matchedApplications, loading };
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
