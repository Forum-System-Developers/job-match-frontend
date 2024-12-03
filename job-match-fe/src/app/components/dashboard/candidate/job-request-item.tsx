import React, { useState } from "react";
import Image from "next/image";
import { JobAdResponse } from "@/data/job-ad-data";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icons8-accept.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { acceptMatchRequestFromAd } from "@/services/matching";

const JobRequestItem = ({ request }: { request: JobAdResponse }) => {
  const [response, setResponse] = useState<boolean>(false);

  const handleAccept = async () => {
    try {
      const response = await acceptMatchRequestFromAd(request.id, applicationId);
      setResponse(response)
    }
  }

  return (
    <tr>
      <td>{request.title}</td>
      <td>
        {/* <div
          className={`job-type fw-500 ${
            duration === "Part-Time" ? "part-time" : ""
          }`}
        >
          {duration}
        </div> */}
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
              <a className="dropdown-item" href={`/job-ad/${request.id}`}>
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
                <Image src={edit} alt="icon" className="lazy-img" /> Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image src={delete_icon} alt="icon" className="lazy-img" />{" "}
                Delete
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default JobRequestItem;
