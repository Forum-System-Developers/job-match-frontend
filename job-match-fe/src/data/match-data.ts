import axiosInstance from "@/services/axiosInstance";

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

export interface MatchRequestApplication {
  job_ad_id: string;
  job_application_id: string;
  status: "requested_by_job_app";
  name: string;
  description: string;
  professional_id: string;
  professional_first_name: string;
  professional_last_name: string;
  min_salary: string;
  max_salary: string;
}

export const getMatchRequestsForProfessional = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/professionals/${id}/match-requests`
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

export const getMatchRequestsForCompany = async () => {
  try {
    const response = await axiosInstance.get(`/companies/match-requests`);
    const jobAds = response.data.detail ?? [];

    const requests: MatchRequestApplication[] = await Promise.all(
      jobAds.map(async (job_app: any) => {
        return {
          job_ad_id: job_app.job_app_id,
          job_application_id: job_app.job_application_id,
          status: job_app.status,
          name: job_app.name,
          description: job_app.description,
          professional_id: job_app.professional_id,
          professional_first_name: job_app.professional_first_name,
          professional_last_name: job_app.professional_last_name,
          min_salary: job_app.min_salary,
          max_salary: job_app.max_salary,
        };
      })
    );

    return requests;
  } catch (error) {
    console.error("Error fetching match requests:", error);
    return [];
  }
};
