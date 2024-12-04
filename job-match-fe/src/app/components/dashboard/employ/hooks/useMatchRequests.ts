import { useState, useEffect } from "react";
import {
  getMatchRequestsForCompany,
  MatchRequestApplication,
} from "@/data/match-data";
import { currentUser, UserDetails } from "@/utils/auth_utils";

export const useMatchRequests = () => {
  const [requests, setRequests] = useState<MatchRequestApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const requests = await getMatchRequestsForCompany();
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
