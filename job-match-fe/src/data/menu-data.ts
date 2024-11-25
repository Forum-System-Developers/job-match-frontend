import { IMenuData } from "@/types/menu-data-type";
import { role } from "@/utils/auth_utils";

const menu_data: IMenuData[] = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "/job-list-v1",
    title: "Jobs & Applications",
    mega_menus: [
      {
        id: 1,
        title: "By Professionals",
        sub_menus: [{ link: "/job-list-v1", title: "Job Aplications" }],
      },
      {
        id: 2,
        title: "By Companies",
        sub_menus: [{ link: "/job-list-v3", title: "Job Ads" }],
      },
      {
        id: 3,
        title: "Wishlist",
        sub_menus: [
          { link: "/job-wishlist", title: "Job Wishlist" },
          { link: "/job-details-v1", title: "Job Details v-1" },
          { link: "/job-details-v2", title: "Job Details v-2" },
        ],
      },
    ],
  },
  {
    id: 3,
    link: "/candidates-v1",
    title: "Explore",
    mega_menus: [
      {
        id: 1,
        title: "Professionals",
        sub_menus: [
          { title: "View all professionals", link: "/candidates-v1" },
          { title: "Candidates Details v-1", link: "/candidate-profile-v1" },
          { title: "Candidates Details v-2", link: "/candidate-profile-v2" },
        ],
      },
      {
        id: 2,
        title: "Companies",
        sub_menus: [
          { title: "View all companies", link: "/company-v2" },
          { title: "Company Details", link: "/company-details" },
        ],
      },
      {
        id: 3,
        title: "Essential",
        sub_menus: [
          { title: "About Us", link: "/about-us" },
          { title: "Pricing", link: "/pricing" },
          { title: "FAQ", link: "/faq" },
          { title: "Register", link: "/register" },
        ],
      },
    ],
  },
  // {
  //   id: 4,
  //   link: "/blog-v1",
  //   title: "Blog",
  //   sub_menus: [
  //     { link: "/blog-v1", title: "Blog Standard" },
  //     { link: "/blog-v2", title: "Blog Grid" },
  //     { link: "/blog-v3", title: "Full width" },
  //     { link: "/blog-details", title: "Blog Details" },
  //   ],
  // },
  {
    id: 5,
    link: "/contact",
    title: "Contact",
  },
  {
    id: 6,
    link:
      role === "company"
        ? "/dashboard/employ-dashboard"
        : "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
];

export default menu_data;
