import { StaticImageData } from "next/image";

export interface IJobType {
  id: number;
  logo: StaticImageData | string;
  title: string;
  duration: string;
  date: string;
  company: string;
  location: string;
  category: string[];
  tags?: string[];
  experience: string;
  salary: number;
  salary_duration: string;
  english_fluency: string;
  overview: string;
}
