import React, { useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icons8-accept.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { JobApplication } from "@/data/job-applications-data";
import { statusClassMapping } from "@/app/components/dashboard/employ/job-item";

const JobApplicationItem = ({
  application,
}: {
  application: JobApplication;
}) => {
  const statusClass = statusClassMapping[application.status] ?? "active";

  return (
    <tr className={statusClass}>
      <td>{application.name}</td>
      <td>
        <div>{application.description.slice(0, 138)}...</div>
      </td>
      <td>{application.min_salary}</td>
      <td>{application.max_salary}</td>
      <td>
        <div className="job-status text-capitalize">{application.status}</div>
      </td>
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
              <a
                className="dropdown-item"
                href={`/job-application/${application.id}`}
              >
                <Image src={view} alt="icon" className="lazy-img" /> View
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default JobApplicationItem;
