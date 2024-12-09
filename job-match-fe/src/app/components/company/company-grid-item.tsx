import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { CompanyDetails } from "@/data/company-data";

const CompanyGridItem = ({ item }: { item: CompanyDetails }) => {
  return (
    <div
      className={`company-grid-layout ${false ? "favourite" : ""} mb-30`}
      style={{
        backgroundColor: "#eff6f3",
      }}
    >
      <Link
        href={{
          pathname: `/company/${item.id}`,
        }}
        className="company-logo me-auto ms-auto rounded-circle"
      >
        <Image
          src={item.logo || profile_icon_1}
          alt="image"
          className="lazy-img rounded-circle"
          height={55}
          width={55}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Link>
      <h5 className="text-center">
        <Link
          href={{
            pathname: `/company/${item.id}`,
          }}
          className="company-name tran3s"
        >
          {item.name}
        </Link>
      </h5>
      <div
        className="team-text"
        style={{
          textAlign: "center",
        }}
      >
        <Link
          href={item?.website_url || `mailto:${item?.email}`}
          className="website-btn-two tran3s"
          target="_blank"
        >
          {item?.website_url || item?.email}
        </Link>
      </div>
      <div
        className="team-text"
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "#31795a",
        }}
      >
        <p>{item.description.slice(0, 138)}...</p>
      </div>
      <div className="bottom-line d-flex">
        <Link
          href={{
            pathname: `/company/${item.id}`,
          }}
        >
          {item.active_job_ads} open jobs
        </Link>
        <Link
          href={{
            pathname: `/company/${item.id}`,
          }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default CompanyGridItem;
