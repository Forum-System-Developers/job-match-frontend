import React from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import ActionDropdown from "./action-dropdown";
import { useAds } from "../../company/hooks/useAds";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SavedJobArea = ({ setIsOpenSidebar }: IProps) => {
  const { ads, loading } = useAds();

  let job_data = ads;

  const job_items = job_data.slice(0, 4);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Job</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="wrapper">
          {job_items.map((j) => (
            <div
              key={j.id}
              className="job-list-one style-two position-relative mb-20"
            >
              <div className="row justify-content-between align-items-center">
                <div className="col-xxl-3 col-lg-4">
                  <div className="job-title d-flex align-items-center">
                    <a href="#" className="logo">
                      <Image
                        src={j.company_logo}
                        alt="img"
                        className="lazy-img m-auto"
                      />
                    </a>
                    <a href="#" className="title fw-500 tran3s">
                      {j.title}
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                  {/* <Link
                    href={`/job-details-v1/${j.id}`}
                    className={`job-duration fw-500 ${
                      j.skill_level === "Part time" ? "part-time" : ""
                    }`}
                  >
                    {j.skill_level}
                  </Link> */}
                  <div className="job-salary">
                    <span className="fw-500 text-dark">${j.min_salary}</span> /{" "}
                    {j.min_salary} . {j.max_salary}
                  </div>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                  <div className="job-location">
                    <a href="#">{j.city_name}</a>
                  </div>
                  <div className="job-category">
                    <a href="#">{j.category_name}</a>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
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
                    <ActionDropdown />
                    {/* action dropdown end */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>..</li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavedJobArea;
