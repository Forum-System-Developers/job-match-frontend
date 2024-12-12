"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
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
  } = item || {};

  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
    >
      <Link href={`/job-ad/${id}`} className="logo">
        <Image
          src={company_logo ? company_logo : profile_icon_1}
          alt="logo"
          className="lazy-img m-auto"
          height={35}
          width={35}
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
        <Link href={`/job-ad/${id}`} className="job-duration fw-500">
          {company_name}
        </Link>
      </div>

      <div>
        <Link href={`/job-ad/${id}`} className="title fw-500 tran3s">
          {title}
        </Link>
      </div>
      <div className="job-salary">
        <span className="fw-500 text-dark">Min Salary | Max Salary</span>
        <div className="job-salary">
          {min_salary} BGN - {max_salary} BGN
        </div>{" "}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
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
