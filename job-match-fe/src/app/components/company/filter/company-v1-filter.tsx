"use client";
import React, { useEffect, useState } from "react";
import FilterCompanyLocation from "./filter-company-location";
import { useAppDispatch } from "@/redux/hook";
import { resetFilter } from "@/redux/features/filterSlice";
import { CompanyDetails } from "@/data/company-data";

const CompanyV1Filter = ({
  searchTerm,
  // onSearch,
  companies,
}: {
  searchTerm: string;
  // onSearch: (value: string) => void;
  companies: CompanyDetails[];
}) => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetFilter());
  };
  return (
    <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
      {/* <div className="filter-block bottom-line pb-25">
        <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseSemploye"
          role="button"
          aria-expanded="false"
        >
          Search Company
        </a>
        <div className="collapse show" id="collapseSemploye">
          <div className="main-body">
            <form action="#" className="input-box position-relative">
              <input
                type="text"
                placeholder="Company Name"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
              <button>
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div> */}

      <div className="filter-block bottom-line pb-25 mt-25">
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
            <FilterCompanyLocation companies={companies} />
          </div>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default CompanyV1Filter;
