import { useState, useEffect } from "react";
import { JobAdResponse } from "@/data/job-ad-data";
import { getMatchRequestsForProfessional } from "@/data/professional-data";
import { getURL } from "next/dist/shared/lib/utils";
import { currentUser, UserDetails } from "@/utils/auth_utils";

export const useMatchRequests = () => {
  const [requests, setRequests] = useState<JobAdResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const user: UserDetails = await currentUser();
      const requests = await getMatchRequestsForProfessional(user.id as string);
      setRequests(requests);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, loading };
};
