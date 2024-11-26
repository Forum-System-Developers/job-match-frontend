import img_1 from "@/assets/images/logo/media_29.png";
import { ICompany } from "./../types/company-type";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";

export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get(`http://${SERVER_URL}/companies/`);
    const companies: ICompany[] = (response.data.detail ?? []).map(
      (company: any) => ({
        id: company.id,
        img: img_1,
        name: company.name,
        location: company.city,
        successfull_matches: company.successful_matches,
        vacancy: company.active_job_ads,
        isFav: false,
      })
    );
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};
