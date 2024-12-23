import React from "react";
import ActionDropdown from "../candidate/action-dropdown";
import Image from "next/image";
import { ProfessionalDetails } from "@/data/professional-data";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";

const CandidateItem = ({ item }: { item: ProfessionalDetails }) => {
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={item.photo || profile_icon_1}
              alt="image"
              className="lazy-img rounded-circle"
              style={{ height: "auto" }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <a href="#" className="tran3s">
                    {item.first_name} {item.last_name}
                  </a>
                </h4>
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  <li className="more">2+</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Active Application</span>
                <div>{item.active_application_count}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Location</span>
                <div>{item.city}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                <a
                  href="#"
                  className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                >
                  <i className="bi bi-eye"></i>
                </a>
                <div className="action-dots float-end mt-10 ms-2">
                  <button
                    className="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span></span>
                  </button>
                  {/* <ActionDropdown /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateItem;
