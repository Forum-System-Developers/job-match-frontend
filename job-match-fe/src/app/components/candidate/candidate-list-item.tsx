import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { ProfessionalDetails } from "@/data/professional-data";

const CandidateListItem = ({
  item,
  style_2 = false,
}: {
  item: ProfessionalDetails;
  style_2?: boolean;
}) => {
  return (
    <div
      className={`candidate-profile-card ${false ? "favourite" : ""} ${
        style_2 ? "border-0" : ""
      } list-layout mb-25`}
    >
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <Link
            href={{
              pathname: `/candidate/${item.id}`,
            }}
            className="rounded-circle"
          >
            <Image
              src={item?.photo || profile_icon_1}
              height={55}
              width={55}
              alt="image"
              className="lazy-img rounded-circle"
            />
          </Link>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <Link
                    href={{
                      pathname: `/candidate/${item.id}`,
                    }}
                    className="tran3s"
                  >
                    {item.first_name} {item.last_name}
                  </Link>
                </h4>
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  {item.skills?.slice(0, 3).map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                  {item.skills?.length > 3 && (
                    <li className="more">
                      {item.skills?.length - item.skills?.slice(0, 3).length}+
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Applications</span>
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
              <div className="d-flex justify-content-lg-end">
                <Link
                  href={{
                    pathname: `/candidate/${item.id}`,
                  }}
                  className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateListItem;
