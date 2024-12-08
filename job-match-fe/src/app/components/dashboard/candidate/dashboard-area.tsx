"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import main_graph from "@/assets/dashboard/images/main-graph.png";
import DashboardHeader from "./dashboard-header";
import {
  useJobApplicationsProfessional,
  useMatchedApplicationsProfessional,
} from "../../jobs/hooks/useJobApplications";
import { useUser } from "@/hooks/use-user";

// card item
export function CardItem({
  img,
  value,
  title,
}: {
  img: StaticImageData;
  value: string;
  title: string;
}) {
  return (
    <div className="col-lg-3 col-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <Image src={img} alt="icon" className="lazy-img" />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const { user } = useUser();
  const { jobApplications, loading: jobApplicationsLoading } =
    useJobApplicationsProfessional(user?.id as string);
  const { matchedApplications, loading: matchedApplicationsLoading } =
    useMatchedApplicationsProfessional();
  const job_data = jobApplications;
  const matched_applications = matchedApplications;
  const job_items = [...job_data.slice(0, 5)];
  const matched_items = [...matched_applications.slice(0, 5)];

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem img={icon_1} title="Total Visitor" value="1.7k+" />
          <CardItem img={icon_2} title="Shortlisted" value="03" />
          <CardItem img={icon_3} title="Views" value="2.1k" />
          <CardItem img={icon_4} title="Applied Job" value="07" />
        </div>

        <div
          className="row d-flex pt-50 lg-pt-10"
          style={{
            display: "flex",
            alignContent: "space-between",
            justifyContent: "center",
          }}
        >
          {/* <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Profile Views</h4>
              <div className="ps-5 pe-5 mt-50">
                <Image
                  src={main_graph}
                  alt="main-graph"
                  className="lazy-img m-auto"
                />
              </div>
            </div>
          </div> */}

          <div
            className="col-xl-5 col-lg-6 d-flex"
            style={{
              minHeight: "40vh",
            }}
          >
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Matched Job Applications</h4>
              <div className="wrapper">
                {matched_items.map((j) => (
                  <div
                    key={j.id}
                    className="job-item-list d-flex align-items-center"
                  >
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a href="#">{j.name}</a>
                      </h6>
                      <div className="meta">
                        <span>{j.description}</span> . <span>{j.city}</span>
                      </div>
                    </div>
                    <div className="job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            View Job
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Active Job Applications</h4>
              <div className="wrapper">
                {job_items.map((j) => (
                  <div
                    key={j.id}
                    className="job-item-list d-flex align-items-center"
                  >
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a href="#">{j.name}</a>
                      </h6>
                      <div className="meta">
                        <span>{j.description}</span> . <span>{j.city}</span>
                      </div>
                    </div>
                    <div className="job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            View Matched Ad
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
