import React, { useState } from "react";
import Image from "next/image";
import { MatchRequestAd, MatchRequestApplication } from "@/data/match-data";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icons8-accept.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import {
  acceptMatchRequestFromAd,
  acceptMatchRequestFromApplication,
  rejectMatchRequestFromAd,
  rejectMatchRequestFromApplication,
} from "@/services/matching";

const JobRequestItem = ({ request }: { request: MatchRequestApplication }) => {
  const [response, setResponse] = useState<boolean>(false);

  const handleAccept = async () => {
    try {
      await acceptMatchRequestFromApplication(
        request.job_ad_id,
        request.job_application_id
      );
      setResponse(true);
    } catch (error) {
      console.error("Error accepting match request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectMatchRequestFromApplication(
        request.job_ad_id,
        request.job_application_id
      );
      setResponse(true);
    } catch (error) {
      console.error("Error rejecting match request:", error);
    }
  };

  return (
    <tr>
      <td>{request.name}</td>
      <td>
        <div>{request.description}</div>
      </td>
      <td>{request.min_salary}</td>
      <td>{request.max_salary}</td>
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
                href={`/job-ad/${request.job_ad_id}`}
              >
                <Image src={view} alt="icon" className="lazy-img" /> View
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault(), handleAccept();
                }}
              >
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
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault(), handleReject();
                }}
              >
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

export default JobRequestItem;
