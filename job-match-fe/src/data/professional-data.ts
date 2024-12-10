import Image, { StaticImageData } from "next/image";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import { getUserLocal } from "@/services/auth_service";
import axiosInstance from "@/services/axiosInstance";
import axios from "axios";
import { JobApplication } from "./job-applications-data";
import { MatchRequestAd } from "./match-data";

// nav data
export const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/active-applications",
    title: "Applications",
  },
  // {
  //   id: 4,
  //   icon: nav_4,
  //   icon_active: nav_4_active,
  //   link: "/dashboard/candidate-dashboard/messages",
  //   title: "Messages",
  // },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/match-requests",
    title: "Match Requests",
    // },
    // {
    //   id: 5,
    //   icon: nav_5,
    //   icon_active: nav_5_active,
    //   link: "/dashboard/candidate-dashboard/job-alert",
    //   title: "Job Alert",
  },
  // {
  //   id: 6,
  //   icon: nav_6,
  //   icon_active: nav_6_active,
  //   link: "/dashboard/candidate-dashboard/saved-job",
  //   title: "Saved Job",
  // },
];

export interface Skills {
  id: string;
  name: string;
  category_id: string;
}
export interface ProfessionalDetails {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  photo: string | null;
  city: string;
  email: string;
  status: "active" | "busy";
  skills: Skills[];
  active_application_count: number;
  sent_match_requests: MatchRequestAd[] | null;
}

interface CVResponse {
  file: Blob | null;
  filename: string | null;
}

interface ProfessinalUpdate {
  professional: {
    first_name: string | null;
    last_name: string | null;
    description: string | null;
    city: string | null;
  };
  status: string;
}

export const getCurrentProfessional =
  async (): Promise<ProfessionalDetails | null> => {
    try {
      const user = getUserLocal();
      const { data } = await axiosInstance.get(`/professionals/${user?.id}`);
      const {
        id,
        first_name,
        last_name,
        description,
        photo,
        city,
        email,
        status,
        skills,
        active_application_count,
        sent_match_requests,
      } = data.detail;

      const professional = {
        id,
        first_name,
        last_name,
        description,
        photo,
        city,
        email,
        status,
        skills,
        active_application_count,
        sent_match_requests,
      };
      return professional;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };

export const getPhoto = async (id: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.get<Blob>(
      `/professionals/${id}/download-photo`,
      { responseType: "blob" }
    );
    const photoUrl = URL.createObjectURL(response.data);
    return photoUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error(
        "Error fetching photo:",
        error.response?.status,
        error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }

    return null;
  }
};

export const uploadPhoto = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await axiosInstance.post(
      `/professionals/upload-photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading photo:", error);
  }
};

export const getProfessional = async (
  id: string
): Promise<ProfessionalDetails | null> => {
  try {
    const { data } = await axiosInstance.get(`/professionals/${id}`);
    const {
      user_id,
      first_name,
      last_name,
      description,
      photo,
      city,
      email,
      status,
      skills,
      active_application_count,
      sent_match_requests,
    } = data.detail;

    const professional = {
      id: user_id,
      first_name,
      last_name,
      description,
      photo,
      city,
      email,
      status,
      skills,
      active_application_count,
      sent_match_requests,
    };
    return professional;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const getSkills = async (id: string | null): Promise<Skills[] | []> => {
  try {
    const response = await axiosInstance.get(`/professionals/${id}/skills`);
    const skillsResponse = response.data.detail ?? [];
    const skills: Skills[] | [] = await Promise.all(
      skillsResponse.map(async (skill: any) => {
        return {
          name: skill.name,
          level: skill.level,
        };
      })
    );
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const getCV = async (id: string): Promise<CVResponse | null> => {
  try {
    const response = await axiosInstance.get<Blob>(
      `/professionals/${id}/download-cv`,
      { responseType: "blob" }
    );
    const contentDisposition = response.headers["content-disposition"];
    let filename = null;
    if (contentDisposition) {
      filename = contentDisposition
        .split("filename=")[1]
        ?.replace(/['"]/g, "")
        .trim();
    }

    return { file: response.data, filename };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error fetching CV: ${error.response?.status} ${error.message}`
      );
    } else {
      throw new Error(`Error fetching CV: ${error}`);
    }
  }
  return null;
};

export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append("cv", file);

  try {
    const response = await axiosInstance.post(
      `/professionals/upload-cv`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const deleteCV = async () => {
  try {
    await axiosInstance.delete(`/professionals/cv`);
  } catch (error) {
    console.error("Error deleting CV:", error);
  }
};

export const getJobApplicationsForProfessional = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/professionals/${id}/job-applications`,
      {
        params: {
          application_status: "active",
        },
      }
    );
    const jobApplications = response.data.detail ?? [];

    const applications: JobApplication[] = await Promise.all(
      jobApplications.map(async (job_application: any) => {
        return {
          id: job_application.application_id,
          name: job_application.name,
          professional_id: job_application.professional_id,
          created_at: job_application.created_at,
          category_id: job_application.category_id,
          category_title: job_application.category_title,
          photo: null,
          first_name: job_application.first_name,
          last_name: job_application.last_name,
          city: job_application.city,
          email: job_application.email,
          skills: job_application.skills,
          status: job_application.status,
          min_salary: job_application.min_salary,
          max_salary: job_application.max_salary,
          description: job_application.description,
        };
      })
    );

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

export const getMatchedApplicationsForProfessional = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/professionals/${id}/job-applications`,
      {
        params: {
          application_status: "matched",
        },
      }
    );
    const jobApplications = response.data.detail ?? [];
    const applications: JobApplication[] = await Promise.all(
      jobApplications.map(async (job_application: any) => {
        return {
          id: job_application.application_id,
          name: job_application.name,
          professional_id: job_application.professional_id,
          created_at: job_application.created_at,
          category_id: job_application.category_id,
          category_title: job_application.category_title,
          photo: null,
          first_name: job_application.first_name,
          last_name: job_application.last_name,
          city: job_application.city,
          email: job_application.email,
          skills: job_application.skills,
          status: job_application.status,
          min_salary: job_application.min_salary,
          max_salary: job_application.max_salary,
          description: job_application.description,
        };
      })
    );

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

export const getProfessionals = async () => {
  try {
    const response = await axiosInstance.post(`/professionals/all`);
    const professionalsData = response.data.detail ?? [];

    const professionals: ProfessionalDetails[] = await Promise.all(
      professionalsData.map(async (professional: any) => {
        const imgUrl = await getPhoto(professional.id);

        return {
          id: professional.id,
          first_name: professional.first_name,
          last_name: professional.last_name,
          description: professional.description,
          photo: imgUrl,
          city: professional.city,
          email: professional.email,
          status: professional.status,
          skills: professional.skills,
          active_application_count: professional.active_application_count,
          sent_match_requests: professional.sent_match_requests,
        };
      })
    );

    return professionals;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return [];
  }
};

export const updateProfessional = async (data: ProfessinalUpdate) => {
  try {
    await axiosInstance.put(`/professionals/`, data);
  } catch (error) {
    console.error("Error updating professional:", error);
  }
};
