import React from "react";
import Image from "next/image";
import Link from "next/link";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import { CompanyDetails } from "@/data/company-data";

const CompanyListItem = ({ item }: { item: CompanyDetails }) => {
  return (
    <div className={`company-list-layout ${false ? "favourite" : ""} mb-20`}>
      <div className="row justify-content-between align-items-center">
        <div className="col-xl-5">
          <div className="d-flex align-items-xl-center">
            <Link
              href={{
                pathname: `/company/${item.id}`,
              }}
              className="company-logo rounded-circle"
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
            <div
              className="company-data"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <h5 className="m0">
                <Link
                  href={{
                    pathname: `/company/${item.id}`,
                  }}
                  className="company-name tran3s"
                >
                  {item.name}
                </Link>
              </h5>
              <div className="team-text">
                <Link
                  href={item?.website_url || `mailto:${item?.email}`}
                  className="website-btn-two tran3s"
                  target="_blank"
                >
                  {item?.website_url || item?.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-8">
          <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
            <div className="d-flex align-items-center">
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">
                  {item.successful_matches}{" "}
                </span>{" "}
                Successful Matches
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-4">
          <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
            <Link
              href={{
                pathname: `/company/${item.id}`,
              }}
              className="open-job-btn text-center fw-500 tran3s me-2"
            >
              {item.active_job_ads} open jobs
            </Link>
            <Link
              href={{
                pathname: `/company/${item.id}`,
              }}
              className="save-btn text-center rounded-circle tran3s"
              title="Save Job"
            >
              <i className="bi bi-bookmark-dash"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
