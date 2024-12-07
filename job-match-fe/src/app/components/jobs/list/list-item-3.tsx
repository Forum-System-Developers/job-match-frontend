"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import verify from "@/assets/images/icon/icon_51.svg";
import { JobApplication } from "../../../../data/job-applications-data";

const ListItemThree = ({ item }: { item: JobApplication }) => {
  return (
    <div className="job-list-three d-flex h-100 w-100">
      <div className="main-wrapper h-100 w-100">
        {/* <a
          onClick={() => handleAddWishlist(item)}
          className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
            isActive ? "active" : ""
          }`}
          title={`${isActive ? "Remove Job" : "Save Job"}`}
        >
          <i className="bi bi-bookmark-dash"></i>
        </a> */}
        <div className="list-header d-flex align-items-center">
          <Link href={`/job-application/${item.id}`} className="logo">
            <Image
              src={item.photo || profile_icon_1}
              alt="logo"
              className="lazy-img m-auto"
              width={50}
              height={50}
            />
          </Link>
          <div className="info-wrapper">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                href={`/job-application/${item.id}`}
                className="title fw-500 tran3s"
              >
                {item.name}
              </Link>
              <div
                style={{
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  href={`/candidate/${item.professional_id}`}
                  className="fw-500 text-dark"
                >
                  {item.first_name} {item.last_name}
                </Link>
              </div>
            </div>

            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ul
                className="style-none d-flex flex-wrap info-data"
                style={{
                  width: "100%",
                }}
              >
                <li>
                  <div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">Min Salary</span> |{" "}
                      {item.min_salary} BGN
                    </div>
                    <div className="job-salary">
                      <span className="fw-500 text-dark">Max Salary</span> |{" "}
                      {item.max_salary} BGN
                    </div>
                  </div>
                </li>
              </ul>
              <div className="job-salary">{item.city}</div>
            </div>
          </div>
        </div>
        <p>{item.description.slice(0, 138)}...</p>
        <div className="d-sm-flex align-items-center justify-content-between mt-auto">
          <div className="d-flex align-items-center">
            <Image src={verify} alt="icon" />
            <span className="fw-500 client-status">Verified Client .</span>
            {/* <Link
              href={`/job-application
              /${item.id}`}
              className={`job-duration fw-500 ${
                duration === "Part time" ? "part-time" : ""
              }`}
            >
              {duration}
            </Link> */}
          </div>
          <Link
            href={`/job-application/${item.id}`}
            className="apply-btn text-center tran3s xs-mt-20"
          >
            VIEW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListItemThree;
