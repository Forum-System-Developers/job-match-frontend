"use client";
import React, { use, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { CardItem } from "../common/card-item";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import DashboardHeader from "./dashboard-header";
import {
  useJobApplicationsProfessional,
  useMatchedApplicationsProfessional,
} from "../../jobs/hooks/useJobApplications";
import { useCurrentProfessional } from "./hooks/useCurrentProfessional";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const { professional, loading: professionalLoading } =
    useCurrentProfessional();
  const userId = professional?.id;

  const { jobApplications, isLoading: jobLoading } =
    useJobApplicationsProfessional(userId as string);
  const { matchedApplications, isLoading: matchedLoading } =
    useMatchedApplicationsProfessional(userId as string);

  if (professionalLoading || jobLoading || matchedLoading) {
    return <div>Loading...</div>;
  }

  const active_application_count = professional?.active_application_count;
  const sent_match_requests = professional?.sent_match_requests?.length ?? 0;

  const job_items =
    jobApplications && matchedApplications
      ? [...jobApplications.slice(0, 5)]
      : [];
  const matched_items = matchedApplications
    ? [...matchedApplications.slice(0, 5)]
    : [];

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem
            img={icon_1}
            title="Applications"
            value={`${active_application_count}`}
          />
          <CardItem img={icon_2} title="Shortlisted" value="03" />
          <CardItem img={icon_3} title="Views" value="2.1k" />
          <CardItem
            img={icon_4}
            title="Sent Requests"
            value={`${sent_match_requests}`}
          />
        </div>

        <div
          className="row d-flex pt-50 lg-pt-10"
          style={{
            display: "flex",
            alignContent: "space-between",
            justifyContent: "center",
          }}
        >
          <div
            className="col-xl-5 col-lg-6 d-flex"
            style={{
              minHeight: "40vh",
            }}
          >
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Matched Job Applications</h4>
              <div className="wrapper">
                {matched_items && matched_items.length > 0 ? (
                  matched_items.map((j) => (
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
                      <div className="job-action"></div>
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
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Active Job Applications</h4>
              <div className="wrapper">
                {job_items && job_items.length > 0 ? (
                  job_items.map((j) => (
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
                            <a
                              className="dropdown-item"
                              href={`/job-application/${j.id}`}
                            >
                              View Application
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

export default DashboardArea;
