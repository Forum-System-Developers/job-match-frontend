import { useQuery } from "@tanstack/react-query";
import {
  getJobApplications,
  getJobApplication,
} from "../../../../data/job-applications-data";
import {
  getJobApplicationsForProfessional,
  getMatchedApplicationsForProfessional,
} from "@/data/professional-data";

export const useJobApplications = () => {
  const {
    data: jobApplications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job_applications"],
    queryFn: getJobApplications,
  });

  return { jobApplications, isLoading, error };
};

export const useJobApplicationsProfessional = (id: string) => {
  const {
    data: jobApplications = [],
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
  const {
    data: jobApplication = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job_application", id],
    queryFn: () => getJobApplication(id),
    enabled: !!id,
  });

  return { jobApplication, isLoading, error };
};
