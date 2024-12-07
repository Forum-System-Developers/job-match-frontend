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
    setLoading(true);
    try {
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

export const useJobApplicationsProfessional = () => {
  const [jobApplications, setjobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplications = async () => {
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
    fetchApplications();
  }, []);

  return { jobApplications, loading };
};

export const useMatchedApplicationsProfessional = () => {
  const [matchedApplications, setjobApplications] = useState<JobApplication[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const user = await currentUser();
      const id = user.id;
      const jobApplications = await getMatchedApplicationsForProfessional(id);
      setjobApplications(jobApplications);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
