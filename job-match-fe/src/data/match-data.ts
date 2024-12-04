import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";

export interface MatchRequestAd {
  job_ad_id: string;
  job_application_id: string;
  title: string;
  description: string;
  status: "requested_by_job_ad";
  company_id: string;
  company_name: string;
  min_salary: number | null;
  max_salary: number | null;
}

export const getMatchRequestsForProfessional = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `${SERVER_URL}/professionals/${id}/match-requests`
    );
    const jobAds = response.data.detail ?? [];

    const requests: MatchRequestAd[] = await Promise.all(
      jobAds.map(async (job_ad: any) => {
        return {
          job_ad_id: job_ad.job_ad_id,
          job_application_id: job_ad.job_application_id,
          title: job_ad.title,
          description: job_ad.description,
          status: job_ad.status,
          company_id: job_ad.company_id,
          company_name: job_ad.company_name,
          min_salary: job_ad.min_salary,
          max_salary: job_ad.max_salary,
        };
      })
    );

    return requests;
  } catch (error) {
    console.error("Error fetching match requests:", error);
    return [];
  }
};
