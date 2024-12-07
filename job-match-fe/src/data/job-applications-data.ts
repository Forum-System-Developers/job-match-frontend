import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import { getPhoto } from "./professional-data";

export interface JobApplication {
  id: string;
  name: string;
  professional_id: string;
  category_id: string;
  category_title: string;
  first_name: string;
  last_name: string;
  city: string;
  email: string;
  description: string;
  photo: Blob | string | null;
  min_salary: number | null;
  max_salary: number | null;
  status: "active" | "archived";
  skills: string[];
}

export const getJobApplications = async () => {
  try {
    const response = await axiosInstance.post(`/job-applications/all`);
    const jobApplications = response.data.detail ?? [];
    console.log(jobApplications);

    const applications: JobApplication[] = await Promise.all(
      jobApplications.map(async (job_application: any) => {
        const photoBlob = await getPhoto(job_application.professional_id);
        const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

        return {
          id: job_application.id,
          name: job_application.name,
          professional_id: job_application.professional_id,
          category_id: job_application.category_id,
          category_title: job_application.category_title,
          photo: imgUrl,
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

export const getJobApplication = async (
  id: string
): Promise<JobApplication | null> => {
  try {
    const { data } = await axiosInstance.get(`/job-applications/${id}`);
    const photoBlob = await getPhoto(data.detail.professional_id);
    const imgUrl = photoBlob ? URL.createObjectURL(photoBlob) : "";

    const job_application = {
      id: data.detail.id,
      name: data.detail.name,
      professional_id: data.detail.professional_id,
      category_id: data.detail.category_id,
      category_title: data.detail.category_title,
      photo: imgUrl,
      first_name: data.detail.first_name,
      last_name: data.detail.last_name,
      city: data.detail.city,
      email: data.detail.email,
      skills: data.detail.skills,
      status: data.detail.status,
      min_salary: data.detail.min_salary,
      max_salary: data.detail.max_salary,
      description: data.detail.description,
    };
    return job_application;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
