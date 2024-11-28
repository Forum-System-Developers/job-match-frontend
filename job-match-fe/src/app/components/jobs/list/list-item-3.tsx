"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import verify from "@/assets/images/icon/icon_51.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { JobApplication } from "../../job-application/data/job-applications-data";

const ListItemThree = ({ item }: { item: JobApplication }) => {
  // const { id, photo, min_salary, city, description, skills } = item || {};
  const dispatch = useAppDispatch();

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
          <Link
            href={`/job-application
            /${item.id}`}
            className="logo"
          >
            <Image
              src={item.photo ? item.photo : profile_icon_1}
              alt="logo"
              className="lazy-img m-auto"
              width={50}
              height={50}
            />
          </Link>
          <div className="info-wrapper">
            <Link
              href={`/job-application
                /${item.id}`}
              className="title fw-500 tran3s"
            >
              {item.first_name} {item.last_name}
            </Link>
            <ul className="style-none d-flex flex-wrap info-data">
              <li>
                ${item.min_salary ? item.min_salary : 0}/
                {item.max_salary ? item.max_salary : 0}
              </li>
              <li>{item.description}</li>
              <li>{item.city} </li>
            </ul>
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
            href={`/job-application
              /${item.id}`}
            className="apply-btn text-center tran3s xs-mt-20"
          >
            APPLY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListItemThree;
