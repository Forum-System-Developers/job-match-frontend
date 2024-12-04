import { StaticImageData } from "next/image";
import { ICompany } from "./../types/company-type";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import { getLogo } from "@/app/components/dashboard/employ/data/company-data";
import { ProfessionalDetails, getPhoto } from "@/data/professional-data";

// data type
export type ICandidate = {
  id: number;
  img: StaticImageData;
  name: string;
  post: string;
  skills: string[] | [];
  salary: string | null;
  location: string;
  salary_duration: string;
  experience: string;
  favorite?: boolean;
  qualification: string;
};

export const getProfessionals = async () => {
  try {
    const response = await axiosInstance.post(`/professionals/all`);
    const companiesData = response.data.detail ?? [];

    const professionals: ICandidate[] = await Promise.all(
      companiesData.map(async (professional: any) => {
        const photoBlob = await getPhoto(professional.id);
        const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

        return {
          id: professional.id,
          img: imgUrl,
          name: professional.first_name + " " + professional.last_name,
          post: "",
          skills: professional.skills,
          salary: professional.min_salary,
          location: professional.city,
          salary_duration: "",
          experience: "",
          favourite: false,
          qualification: "",
        };
      })
    );

    return professionals;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return [];
  }
};
