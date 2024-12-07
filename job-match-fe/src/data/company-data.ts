import { ICompany } from "./../types/company-type";
import axiosInstance from "@/services/axiosInstance";
import { getLogo } from "@/app/components/dashboard/employ/data/company-data";

export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get(`/companies/`);
    const companiesData = response.data.detail ?? [];

    const companies: ICompany[] = await Promise.all(
      companiesData.map(async (company: any) => {
        const photoBlob = await getLogo(company.id);
        const imgUrl = photoBlob
          ? URL.createObjectURL(photoBlob)
          : "/path/to/default/image.png";

        return {
          id: company.id,
          img: imgUrl,
          name: company.name,
          location: company.city,
          successfull_matches: company.successful_matches,
          vacancy: company.active_job_ads,
          isFav: false,
        };
      })
    );

    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};
