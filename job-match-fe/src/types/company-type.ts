import { StaticImageData } from "next/image";

export interface ICompany {
  id: number;
  img: StaticImageData;
  name: string;
  location: string;
  vacancy: number;
  successfull_matches: number;
  isFav?: boolean;
}
