import { IMenuData } from "@/types/menu-data-type";
import { isAuthenticated, role } from "@/services/auth_service";

const isUserAuthenticated = isAuthenticated();

const menu_data: IMenuData[] = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "/",
    title: "Jobs & Applications",
    mega_menus: [
      {
        id: 1,
        title: "By Companies",
        sub_menus: [
          {
            link: isUserAuthenticated ? "/job-ads" : "/register",
            title: "Job postings",
          },
        ],
      },
      {
        id: 2,
        title: "By Professionals",
        sub_menus: [
          {
            link: isUserAuthenticated ? "/job-applications" : "/register",
            title: "Job Applications",
          },
        ],
      },
      {
        id: 3,
        title: isUserAuthenticated
          ? role() === "company"
            ? "Your Job Ads"
            : "Your Applications"
          : "Your posts",
        sub_menus: [
          {
            link: isUserAuthenticated
              ? role() === "company"
                ? "/dashboard/employ-dashboard/jobs"
                : "/dashboard/candidate-dashboard/applications"
              : "/register",
            title: "View all",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    link: "/",
    title: "Explore",
    mega_menus: [
      {
        id: 1,
        title: "Professionals",
        sub_menus: [
          {
            title: "View all professionals",
            link: isUserAuthenticated ? "/professionals" : "/register",
          },
        ],
      },
      {
        id: 2,
        title: "Companies",
        sub_menus: [
          {
            title: "View all companies",
            link: isUserAuthenticated ? "/companies" : "/register",
          },
          // { title: "Company Details", link: "/company-details" },
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
  {
    id: 5,
    link: "/contact",
    title: "Contact",
  },
  {
    id: 6,
    link:
      role() === "company"
        ? "/dashboard/employ-dashboard"
        : "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
];

export default menu_data;
