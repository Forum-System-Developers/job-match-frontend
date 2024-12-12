"use client";
import React from "react";
import Image from "next/image";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
import { JobAdResponse } from "@/data/job-ad-data";

const ListItemTwo = ({ item }: { item: JobAdResponse }) => {
  return (
    <div className="job-list-one style-two position-relative border-style mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="job-title d-flex align-items-center">
            <Link href={`/company/${item.company_id}`} className="logo">
              <Image
                src={item.company_logo ? item.company_logo : profile_icon_1}
                alt="logo"
                className="lazy-img m-auto"
                height={25}
                width={25}
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Link>
            <div className="split-box1">
              <Link
                href={`/company/${item.company_id}`}
                className="job-duration fw-500"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 450,
                  color: "#31795a",
                }}
              >
                {item.company_name}
              </Link>
              <Link
                href={`/job-ad/${item.id}`}
                className="title fw-500 tran3s"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#212529",
                }}
              >
                {item.title.slice(0, 22)} {item.title.length > 20 ? ".." : ""}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="job-salary">
            <span className="fw-500 text-dark">Min Salary</span> |{" "}
            <span className="fw-500 text-dark">Max Salary</span>{" "}
          </div>
          <div className="job-salary">
            {item.min_salary} BGN - {item.max_salary} BGN{" "}
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
            <Link
              href={`/job-ad/${item.id}`}
              className="apply-btn text-center tran3s"
            >
              VIEW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemTwo;
