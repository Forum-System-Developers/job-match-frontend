import { StaticImageData } from "next/image";

export interface ICompany {
  id: number;
  img: Blob | null;
  name: string;
  location: string;
  vacancy: number;
  successfull_matches: number;
  isFav?: boolean;
}
