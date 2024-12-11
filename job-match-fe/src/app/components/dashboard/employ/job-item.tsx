import React from "react";
import ActionDropdown from "../candidate/action-dropdown";
import { JobAdResponse } from "@/data/job-ad-data";

export const statusClassMapping: Record<string, string> = {
  pending: "pending",
  hidden: "pending",
  active: "active",
  archived: "expired",
  private: "expired",
  expired: "expired",
};

const EmployJobItem = ({ ad }: { ad: JobAdResponse | null }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(ad?.created_at || Date.now()));

  const statusClass = ad?.status ? statusClassMapping[ad.status] : "active";

  return (
    <tr className={statusClass}>
      <td>
        <div className="job-name fw-500">{ad?.title}</div>
        <div className="info1">{ad?.description}</div>
      </td>
      <td>{formattedDate}</td>
      <td>{ad?.category_name}</td>
      <td>
        <div className="job-status text-capitalize">{ad?.status}</div>
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
