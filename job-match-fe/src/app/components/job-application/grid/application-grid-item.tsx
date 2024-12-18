"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { JobApplication } from "@/data/job-applications-data";

const ApplicationGridItem = ({
  item,
  style_2 = false,
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
        minHeight: "fit-content",
        border: "1px solid #f1f1f1",
        padding: "10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link
          href={`/job-ad/${id}`}
          className="title fw-500 tran3s"
          style={{
            marginTop: "10%",
            fontSize: "1rem",
            padding: "1%",
            minWidth: "fit-content",
            fontWeight: 500,
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontSize: "1.1rem",
            }}
          >
            {name}
          </span>
        </Link>
      </div>
      <div
        className="job-location"
        style={{
          textAlign: "right",
          padding: "10px",
        }}
      >
        <span
          className="fw-500 text-dark"
          style={{
            fontSize: "1rem",
            color: "#333",
          }}
        >
          {city}
        </span>
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
                width: "100px",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
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
