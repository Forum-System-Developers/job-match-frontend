import React from "react";
import { ProfessionalDetails } from "../../../data/professional-data";

const CandidateBio = ({
  professional,
}: {
  professional: ProfessionalDetails | null;
}) => {
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>{professional?.city} </div>
      </li>

      <li>
        <span>Email: </span>
        <div>
          <a href={`mailto:${professional?.email}`}>{professional?.email}</a>
        </div>
      </li>
      <li>
        <span>Active applications count: </span>
        <div>{professional?.active_application_count}</div>
      </li>
      {/* <li>
        <span>Social:</span>
        <div>
          <a href="#" className="me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </li> */}
    </ul>
  );
};

export default CandidateBio;
