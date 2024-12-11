import { getJobAds } from "@/data/job-ad-data";
import { getAdsCompany } from "../../../../data/company-data";
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
