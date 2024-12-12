"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { JobApplication } from "@/data/job-applications-data";

const ApplicationGridItem = ({
  item,
  style_2 = true,
}: {
  item: JobApplication;
  style_2?: boolean;
}) => {
  const { id, name, first_name, last_name, description, city, photo } =
    item || {};

  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
      style={{
        minWidth: "400px",
        maxHeight: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link href={`/job-ad/${id}`} className="logo">
          <Image
            src={photo || profile_icon_1}
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
        <Link
          href={`/job-ad/${id}`}
          className="title fw-500 tran3s"
          style={{
            marginTop: "7%",
            fontSize: "1rem",
            padding: "0px",
            minWidth: "fit-content",
            fontWeight: 500,
            textAlign: "right",
          }}
        >
          {first_name} {last_name}
        </Link>
        <div
          className="job-location"
          style={{
            textAlign: "right",
          }}
        >
          <Link href={`/job-ad/${id}`}>{city}</Link>
        </div>
      </div>
      <div
        style={{
          marginTop: "0px",
        }}
      >
        <Link href={`/job-ad/${id}`} className="job-duration fw-500">
          {name}
        </Link>
      </div>
      <div className="job-salary">
        <span className="fw-500 text-dark">Description</span>
        <div className="job-salary">{description.slice(0, 138)}...</div>{" "}
      </div>
      <div style={{ padding: "10px 0px" }}>
        <ul className="cadidate-skills style-none d-flex align-items-center">
          {item.skills?.slice(0, 3).map((s, i) => (
            <li
              key={i}
              style={{
                display: "inline-block",
                backgroundColor: "#f1f1f1",
                padding: "10px",
                textAlign: "center",
                borderRadius: "25px",
                marginRight: "5px",
                minWidth: "80px",
                width: "100px" /* Set a fixed width for uniformity */,
                fontSize: "0.9rem",
                whiteSpace: "nowrap" /* Prevent text wrapping */,
                overflow: "hidden" /* Hide overflowing text */,
                textOverflow: "ellipsis",
              }}
            >
              {s.name}
            </li>
          ))}
          {item.skills?.length > 3 && (
            <li className="more">
              {item.skills?.length - item.skills?.slice(0, 2).length}+
            </li>
          )}
        </ul>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <Link href={`/job-ad/${id}`} className="apply-btn text-center tran3s">
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default ApplicationGridItem;
