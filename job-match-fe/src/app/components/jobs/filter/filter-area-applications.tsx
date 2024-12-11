"use client";
import React from "react";
import JobLocations from "./job-locations";
import JobExperience from "./job-experience";
import JobCategory from "./job-category";
import JobTags from "./job-tags";
import JobPrices from "./job-prices";
import { useAppDispatch } from "@/redux/hook";
import { resetFilter } from "@/redux/features/filterSlice";
import { JobAdResponse } from "@/data/job-ad-data";
import { JobApplication } from "@/data/job-applications-data";

// prop type
type IProps = {
  priceValue: number[];
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice: number;
  items: JobApplication[];
};
const FilterAreaApps = ({
  priceValue,
  setPriceValue,
  maxPrice,
  items,
}: IProps) => {
  const dispatch = useAppDispatch();
  // handleReset
  const handleReset = () => {
    dispatch(resetFilter());
    setPriceValue([0, maxPrice]);
  };

  return (
    <div
      className="filter-area-tab offcanvas offcanvas-start"
      id="filteroffcanvas"
    >
      <button
        type="button"
        className="btn-close text-reset d-lg-none"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div
        className="main-title fw-500 text-dark"
        style={{
          backgroundColor: "#eff6f3",
        }}
      >
        Filter By
      </div>
      <div
        className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20"
        style={{
          marginTop: "0px",
          borderRadius: "0px",
        }}
      >
        <div className="filter-block bottom-line pb-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseLocation"
            role="button"
            aria-expanded="false"
          >
            Location
          </a>
          <div className="collapse show" id="collapseLocation">
            <div className="main-body">
              <JobLocations items={items} />
            </div>
          </div>
        </div>

        {/* <!-- /.filter-block --> */}

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseCategory"
            role="button"
            aria-expanded="false"
          >
            Category
          </a>
          <div className="collapse" id="collapseCategory">
            <JobCategory />
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseTag"
            role="button"
            aria-expanded="false"
          >
            Skills
          </a>
          <div className="collapse" id="collapseTag">
            <JobTags items={items} />
          </div>
        </div>
        {/* <!-- /.filter-block --> */}

        <button
          onClick={handleReset}
          className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterAreaApps;
