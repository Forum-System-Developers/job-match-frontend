"use client";
import React from "react";
import Image from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import main_graph from "@/assets/dashboard/images/main-graph.png";
import { CardItem } from "../common/card-item";
import NiceSelect from "@/ui/nice-select";
import DashboardHeaderEmployer from "./dashboard-header";
import { useAdsCompany } from "../../company/hooks/useAds";
import { getUserLocal } from "@/services/auth_service";
import { useCurrentCompany } from "./hooks/useCurrentCompany";
import { useMatchRequestsCompany } from "./hooks/useMatchRequestsCompany";
import { match } from "assert";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployDashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const user = getUserLocal();
  const { company, isLoading: companyLoading } = useCurrentCompany();
  const { ads, isLoading: adsLoading } = useAdsCompany(user?.id as string);
  const { matchRequests, isLoading } = useMatchRequestsCompany();

  const job_items = [...ads.reverse().slice(0, 6)];
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeaderEmployer setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem
            img={icon_1}
            title="Matches"
            value={`${company?.successful_matches}`}
          />
          <CardItem img={icon_2} title="Shortlisted" value="03" />
          <CardItem img={icon_3} title="Views" value="2.1k" />
          <CardItem
            img={icon_4}
            title="Open Jobs"
            value={`${company?.active_job_ads}`}
          />
        </div>

        <div
          className="row d-flex pt-50 lg-pt-10"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Matched Job Ads</h4>
              <div className="wrapper">
                {matchRequests && matchRequests.length > 0 ? (
                  matchRequests.map((j) => (
                    <div
                      key={j.job_application_id}
                      className="job-item-list d-flex align-items-center"
                    >
                      <div className="job-title">
                        <h6 className="mb-5">
                          <a href="#">{j.name}</a>
                        </h6>
                        <div className="meta">
                          <span>{j.description}</span> .{" "}
                          <span>
                            {j.professional_first_name}{" "}
                            {j.professional_last_name}
                          </span>
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
                            <a className="dropdown-item" href="">
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
                  ))
                ) : (
                  <div className="job-item-list d-flex align-items-center">
                    <div
                      className="job-title"
                      style={{
                        textAlign: "center",
                        color: "#3f634d",
                        fontWeight: "bold",
                      }}
                    >
                      <span>No Matched Ads Yet</span>
                    </div>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Posted Job Ads</h4>
              <div className="wrapper">
                {job_items && job_items.length > 0 ? (
                  job_items.map((j) => (
                    <div
                      key={j.id}
                      className="job-item-list d-flex align-items-center"
                    >
                      <div className="job-title">
                        <h6 className="mb-5">
                          <a href="#">{j.title}</a>
                        </h6>
                        <div className="meta">
                          <span>{j.category_name}</span> .{" "}
                          <span>{j.city_name}</span>
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
                            <a className="dropdown-item" href="">
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
                  ))
                ) : (
                  <div className="job-item-list d-flex align-items-center">
                    <div
                      className="job-title"
                      style={{
                        textAlign: "center",
                        color: "#3f634d",
                        fontWeight: "bold",
                      }}
                    >
                      <span>No Active Applications</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployDashboardArea;
