import Image, { StaticImageData } from "next/image";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import { currentUser } from "@/utils/auth_utils";
import axiosInstance from "@/services/axiosInstance";
import axios from "axios";
import SERVER_URL from "@/services/server";
import { JobApplication } from "./job-applications-data";
import { JobAdResponse } from "./job-ad-data";

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
  city: string;
  email: string;
  status: "active" | "busy";
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
      const { data } = await axiosInstance.get(
        `http://${SERVER_URL}/professionals/${user.id}`
      );
      const {
        first_name,
        last_name,
        description,
        city,
        email,
        status,
        active_application_count,
      } = data.detail;

      const professional = {
        id: user.id,
        first_name,
        last_name,
        description,
        city,
        email,
        status,
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
      `http://${SERVER_URL}/professionals/${id}/download-photo`,
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
      `http://${SERVER_URL}/professionals/upload-photo`,
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
    const { data } = await axiosInstance.get(
      `http://${SERVER_URL}/professionals/${id}`
    );
    const {
      first_name,
      last_name,
      description,
      city,
      email,
      status,
      active_application_count,
    } = data.detail;

    const professional = {
      id: id,
      first_name,
      last_name,
      description,
      city,
      email,
      status,
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
    const response = await axiosInstance.get(
      `http://${SERVER_URL}/professionals/${id}/skills`
    );
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
      `http://${SERVER_URL}/professionals/${id}/download-cv`,
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

export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append("cv", file);

  try {
    const response = await axiosInstance.post(
      `http://${SERVER_URL}/professionals/upload-cv`,
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
      `http://${SERVER_URL}/professionals/${id}/job-applications`,
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
          id: job_application.id,
          name: job_application.name,
          professional_id: job_application.professional_id,
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

export const getMatchRequestsForProfessional = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `http://${SERVER_URL}/professionals/${id}/match-requests`
    );
    const jobAds = response.data.detail ?? [];

    const requests: JobAdResponse[] = await Promise.all(
      jobAds.map(async (job_ad: any) => {
        return {
          id: job_ad.id,
          company_id: job_ad.company_id,
          category_id: job_ad.category_id,
          location_id: job_ad.city.id,
          title: job_ad.title,
          description: job_ad.description,
          min_salary: job_ad.min_salary,
          max_salary: job_ad.max_salary,
          status: "active",
          requirements: job_ad.requirements,
          created_at: job_ad.created_at,
          updated_at: job_ad.updated_at,
        };
      })
    );

    return requests;
  } catch (error) {
    console.error("Error fetching match requests:", error);
    return [];
  }
};
