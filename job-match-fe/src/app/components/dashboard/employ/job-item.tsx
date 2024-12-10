import React from "react";
import ActionDropdown from "../candidate/action-dropdown";
import { JobAdResponse } from "@/data/job-ad-data";

const EmployJobItem = ({
  ad,
  status,
}: {
  ad: JobAdResponse | null;
  status: string;
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(ad?.created_at || Date.now()));

  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{ad?.title}</div>
        <div className="info1">{ad?.description}</div>
      </td>
      <td>{formattedDate}</td>
      <td>{ad?.category_name}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
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
          {/* action dropdown start */}
          <ActionDropdown id={ad?.id || null} />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
