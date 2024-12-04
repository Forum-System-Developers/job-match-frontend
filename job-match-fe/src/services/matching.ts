import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";

export const sendMatchRequestToJobApplication = async (
  jobAdId: string,
  jobApplicationId: string
) => {
  try {
    const response = await axiosInstance.post(
      `${SERVER_URL}/job-ads/${jobAdId}/job-applications/${jobApplicationId}/match-requests`
    );
    return response.data.detail;
  } catch (error) {
    console.error("Error sending match request:", error);
    return null;
  }
};

export const sendMatchRequestToJobAd = async (
  jobAdId: string,
  jobApplicationId: string
) => {
  try {
    const response = await axiosInstance.post(
      `${SERVER_URL}/job-applications/${jobApplicationId}/job-ads/${jobAdId}`
    );
    return response.data.detail;
  } catch (error) {
    console.error("Error sending match request:", error);
    return null;
  }
};

export const acceptMatchRequestFromAd = async (
  adId: string,
  applicationId: string
) => {
  try {
    const response = await axiosInstance.put(
      `${SERVER_URL}/job-applications/${applicationId}/${adId}/match-response`,
      {
        accept_request: true,
      }
    );
    return response.data.detail;
  } catch (error) {
    console.error("Error accepting match request:", error);
    return null;
  }
};

export const rejectMatchRequestFromAd = async (
  adId: string,
  applicationId: string
) => {
  try {
    const response = await axiosInstance.put(
      `${SERVER_URL}/job-applications/${applicationId}/${adId}/match-response`,
      {
        accept_request: false,
      }
    );
    return response.data.detail;
  } catch (error) {
    console.error("Error accepting match request:", error);
    return null;
  }
};
