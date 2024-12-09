import React, { useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icons8-accept.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { JobApplication } from "@/data/job-applications-data";

const JobApplicationItem = ({
  application,
}: {
  application: JobApplication;
}) => {
  return (
    <tr>
      <td>{application.name}</td>
      <td>
        <div>{application.description.slice(0, 138)}...</div>
      </td>
      <td>{application.min_salary}</td>
      <td>{application.max_salary}</td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href={`/job-ad/${application.id}`}>
                <Image src={view} alt="icon" className="lazy-img" /> View
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image
                  src={share}
                  alt="icon"
                  className="lazy-img"
                  style={{ width: "15px", height: "15px" }}
                />{" "}
                Accept
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image src={delete_icon} alt="icon" className="lazy-img" />{" "}
                Reject
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default JobApplicationItem;
