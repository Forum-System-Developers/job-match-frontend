import { getJobAds } from "@/data/job-ad-data";
import { getAdsCompany, getMatchedJobAds } from "../../../../data/company-data";
import { useQuery } from "@tanstack/react-query";

export const useAds = () => {
  const {
    data: ads = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all_ads"],
    queryFn: getJobAds,
  });

  return { ads, isLoading, error };
};

export const useAdsCompany = (id: string) => {
  const {
    data: ads = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ads_company", id],
    queryFn: () => getAdsCompany(id),
    enabled: !!id,
    initialData: [],
  });

  return { ads, isLoading, error };
};

export const useMatchedAdsCompany = (id: string) => {
  const {
    data: ads = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matched_ads_company", id],
    queryFn: () => getMatchedJobAds(id),
    enabled: !!id,
    initialData: [],
  });

  return { ads, isLoading, error };
};
