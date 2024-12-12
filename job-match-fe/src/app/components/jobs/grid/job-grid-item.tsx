"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { JobAdResponse } from "@/data/job-ad-data";

const JobGridItem = ({
  item,
  style_2 = true,
}: {
  item: JobAdResponse;
  style_2?: boolean;
}) => {
  const {
    id,
    company_logo,
    company_name,
    city,
    min_salary,
    max_salary,
    title,
    description,
  } = item || {};

  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "10px",
        padding: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          paddingTop: "0px",
          marginTop: "0px",
        }}
      >
        <Link href={`/job-ad/${id}`} className="logo">
          <Image
            src={company_logo ? company_logo : profile_icon_1}
            alt="logo"
            className="lazy-img m-auto"
            height={45}
            width={45}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Link>
        <div
          style={{
            marginTop: "0px",
          }}
        >
          <Link
            href={`/job-ad/${id}`}
            className="job-duration fw-500"
            style={{
              fontSize: "1rem",
              color: "#31795a",
            }}
          >
            {company_name}
          </Link>
        </div>
      </div>

      <div>
        <Link
          href={`/job-ad/${id}`}
          className="title fw-500 tran3s"
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          {title}
        </Link>
        <div className="job-salary">
          <span className="fw-500 text-dark">Min Salary | Max Salary</span>
          <div className="job-salary">
            {min_salary} BGN - {max_salary} BGN
          </div>{" "}
        </div>
        <div
          className="job-salary"
          style={{
            height: "50px",
            overflow: "hidden",
            paddingBottom: "12%",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            color: "grey",
            maxHeight: "50px",
          }}
        >
          <span className="fw-500 text-dark">{description}</span>
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-between mt-auto"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          paddingTop: "0px",
          marginTop: "0px",
        }}
      >
        <div className="job-location">
          <Link href={`/job-ad/${id}`}>{city}</Link>
        </div>
        <Link href={`/job-ad/${id}`} className="apply-btn text-center tran3s">
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default JobGridItem;
