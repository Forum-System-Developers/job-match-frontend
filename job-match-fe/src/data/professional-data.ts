import Image, { StaticImageData } from "next/image";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import { currentUser } from "@/utils/auth_utils";
import axiosInstance from "@/services/axiosInstance";
import axios from "axios";
import { JobApplication } from "./job-applications-data";

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
    id: 4,
    icon: nav_4,
    icon_active: nav_4_active,
    link: "/dashboard/candidate-dashboard/messages",
    title: "Messages",
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/match-requests",
    title: "Match Requests",
  },
  {
    id: 5,
    icon: nav_5,
    icon_active: nav_5_active,
    link: "/dashboard/candidate-dashboard/job-alert",
    title: "Job Alert",
  },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },
];

export interface ProfessionalDetails {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  photo: string | null;
  city: string;
  email: string;
  status: "active" | "busy";
  skills: string[];
  active_application_count: number;
}

export interface Skills {
  name: string;
  level: string;
}

interface CVResponse {
  file: Blob | null;
  filename: string | null;
}

export const getCurrentProfessional =
  async (): Promise<ProfessionalDetails | null> => {
    const user = await currentUser();
    try {
      const { data } = await axiosInstance.get(`/professionals/${user.id}`);
      const {
        first_name,
        last_name,
        description,
        photo,
        city,
        email,
        status,
        skills,
        active_application_count,
      } = data.detail;

      const professional = {
        id: user.id,
        first_name,
        last_name,
        description,
        photo,
        city,
        email,
        status,
        skills: skills.map((skill: any) => skill.name),
        active_application_count,
      };
      return professional;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };

export const getPhoto = async (id: string): Promise<Blob | null> => {
  try {
    const file = await axiosInstance.get<Blob>(
      `/professionals/${id}/download-photo`,
      { responseType: "blob" }
    );
    return file.data;
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
    formData.append("logo", file);

    const response = await axiosInstance.post(
      `/professionals/upload-photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Logo uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading logo:", error);
  } finally {
    window.location.href = "/dashboard/candidate-dashboard/profile";
  }
};

export const getProfessional = async (
  id: string
): Promise<ProfessionalDetails | null> => {
  try {
    const { data } = await axiosInstance.get(`/professionals/${id}`);
    const {
      first_name,
      last_name,
      description,
      photo,
      city,
      email,
      status,
      skills,
      active_application_count,
    } = data.detail;

    const professional = {
      id: id,
      first_name,
      last_name,
      description,
      photo,
      city,
      email,
      status,
      skills: skills.map((skill: any) => skill.name),
      active_application_count,
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
    alert("CV uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
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
          skills: job_application.skills.map((skill: any) => skill.name),
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
          skills: job_application.skills.map((skill: any) => skill.name),
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
    const companiesData = response.data.detail ?? [];

    const professionals: ProfessionalDetails[] = await Promise.all(
      companiesData.map(async (professional: any) => {
        const photoBlob = await getPhoto(professional.id);
        const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

        return {
          id: professional.id,
          first_name: professional.first_name,
          last_name: professional.last_name,
          description: professional.description,
          photo: imgUrl,
          city: professional.city,
          email: professional.email,
          status: professional.status,
          skills: professional.skills.map((skill: any) => skill.name),
          active_application_count: professional.active_application_count,
        };
      })
    );

    return professionals;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return [];
  }
};
