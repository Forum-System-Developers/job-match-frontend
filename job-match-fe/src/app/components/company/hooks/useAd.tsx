import { useQuery } from "@tanstack/react-query";
import { getJobAd, JobAdResponse } from "@/data/job-ad-data";

export const useAd = (id: string) => {
  const {
    data: ad = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job_ad_by_id", id],
    queryFn: async () => getJobAd(id),
    enabled: !!id,
  });

  return { ad, isLoading, error };
};
