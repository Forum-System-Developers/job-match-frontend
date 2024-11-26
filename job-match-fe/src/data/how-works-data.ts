import icon_1 from "@/assets/images/icon/icon_08.svg";
import icon_2 from "@/assets/images/icon/icon_09.svg";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import icon_W_1 from "@/assets/images/icon/icon_43.svg";
import icon_W_2 from "@/assets/images/icon/icon_45.svg";
import icon_W_3 from "@/assets/images/icon/icon_46.svg";
import { how_works_type } from "../types/how-it-works-type";

export const how_works_data: how_works_type[] = [
  {
    id: 1,
    icon: icon_1,
    icon_white: icon_W_1,
    title: "Create an account",
    sub_title: "Sign up as either a Company or a Professional.",
  },
  {
    id: 2,
    icon: icon_2,
    icon_white: icon_W_2,
    title: "Complete your profile",
    sub_title: "Create one or more job ads or job applications.",
  },
  {
    id: 3,
    icon: icon_3,
    icon_white: icon_W_3,
    title: "Send a Match request",
    sub_title:
      "You can request a match with the selected job ad or job application.",
  },
];
