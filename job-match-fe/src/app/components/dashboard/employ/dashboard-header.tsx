"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
// notification item

// props type
type IProps = {
  setIsOpenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeaderEmployer = ({ setIsOpenSidebar }: IProps) => {
  // handle click to open
  const handleOpen = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(true);
    }
  };
  return (
    <header className="dashboard-header">
      <div className="d-flex align-items-center justify-content-end">
        <button
          onClick={handleOpen}
          className="dash-mobile-nav-toggler d-block d-md-none me-auto"
        >
          <span></span>
        </button>
        {/* <form action="#" className="search-form">
          <input type="text" placeholder="Search here.." />
          <button>
            <Image src={search} alt="search" className="lazy-img m-auto" />
          </button>
        </form> */}
        <div>
          <Link
            href="/dashboard/employ-dashboard/submit-job"
            className="job-post-btn tran3s"
          >
            New Job
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeaderEmployer;
