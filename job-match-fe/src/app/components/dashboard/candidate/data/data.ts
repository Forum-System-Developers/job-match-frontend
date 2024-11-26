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

// nav data
const nav_data: {
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
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile",
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/resume",
    title: "Resume",
  },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4_active,
    link: "/dashboard/candidate-dashboard/messages",
    title: "Messages",
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
  {
    id: 7,
    icon: nav_7,
    icon_active: nav_7_active,
    link: "/dashboard/candidate-dashboard/setting",
    title: "Account Settings",
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
