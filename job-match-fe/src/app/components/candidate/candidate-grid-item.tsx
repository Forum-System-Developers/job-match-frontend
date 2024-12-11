import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfessionalDetails } from "@/data/professional-data";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";

const CandidateGridItem = ({
  item,
  style_2 = false,
}: {
  item: ProfessionalDetails;
  style_2?: boolean;
}) => {
  return (
    <div
      className={`candidate-profile-card ${
        false ? "favourite" : ""
      } text-center ${style_2 ? "border-0" : ""} grid-layout mb-25`}
    >
      <Link
        href={{
          pathname: `/candidate/${item.id}`,
        }}
        className="save-btn tran3s"
      >
        <i className="bi bi-heart"></i>
      </Link>
      <div className="cadidate-avatar online position-relative d-block m-auto">
        <Link
          href={{
            pathname: `/candidate/${item.id}`,
          }}
          className="rounded-circle"
        >
          <Image
            src={item.photo || profile_icon_1}
            height={65}
            width={65}
            alt="image"
            className="lazy-img rounded-circle"
          />
        </Link>
      </div>
      <h4 className="candidate-name mt-15 mb-0">
        <Link
          href={{
            pathname: `/candidate/${item.id}`,
          }}
          className="tran3s"
        >
          {item.first_name} {item.last_name}
        </Link>
      </h4>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pt-30 sm-pt-20 pb-10">
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
      <div className="row gx-1">
        <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Applications</span>
            <div>{item.active_application_count}</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Location</span>
            <div>{item.city}</div>
          </div>
        </div>
      </div>
      <div className="row gx-2 pt-25 sm-pt-10">
        <div className="col-md-6">
          <Link
            href={{
              pathname: `/candidate/${item.id}`,
            }}
            className="profile-btn tran3s w-100 mt-5"
          >
            View Profile
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            href={{
              pathname: `mailto:${item.email}`,
            }}
            className="msg-btn tran3s w-100 mt-5"
          >
            Send email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateGridItem;
