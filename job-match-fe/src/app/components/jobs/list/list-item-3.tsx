"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import verify from "@/assets/images/icon/icon_51.svg";
import { JobApplication } from "../../../../data/job-applications-data";

const ListItemThree = ({ item }: { item: JobApplication }) => {
  return (
    <div
      className="job-list-three d-flex h-100 w-100"
      style={{
        padding: "28px",
      }}
    >
      <div className="main-wrapper h-100 w-100">
        <div className="list-header d-flex align-items-center">
          <Link href={`/job-application/${item.id}`} className="logo">
            <Image
              src={item.photo || profile_icon_1}
              alt="logo"
              className="lazy-img m-auto"
              width={35}
              height={35}
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
                style={{
                  fontSize: "1.1rem",
                }}
              >
                {item.name}
              </Link>
              <div
                style={{
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
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
                  fontSize: "0.8rem",
                }}
              >
                <li>
                  <div>
                    <div
                      className="job-salary"
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
                      <span className="fw-500 text-dark">Min Salary</span> |{" "}
                      {item.min_salary} BGN
                    </div>
                    <div
                      className="job-salary"
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
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
          <div>
            <ul className="cadidate-skills style-none d-flex align-items-center">
              {item.skills?.slice(0, 3).map((s, i) => (
                <li
                  key={i}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f1f1f1",
                    padding: "3px",
                    textAlign: "center",
                    borderRadius: "25px",
                    marginRight: "5px",
                    minWidth: "80px",
                    fontSize: "0.9rem",

                    width: "100%",
                  }}
                >
                  {s.name}
                </li>
              ))}
              {item.skills?.length > 3 && (
                <li className="more">
                  {item.skills?.length - item.skills?.slice(0, 3).length}+
                </li>
              )}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Link
              href={`/job-application/${item.id}`}
              className="apply-btn text-center tran3s xs-mt-20"
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemThree;
