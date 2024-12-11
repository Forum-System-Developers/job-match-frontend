"use client";
import React, { useState } from "react";
import FilterSkills from "./filter-skills";
import FilterCandidateLocation from "./filter-location";
import JobPrices from "../../jobs/filter/job-prices";
import { ProfessionalDetails } from "@/data/professional-data";

import { useAppDispatch } from "@/redux/hook";
import { resetFilter } from "@/redux/features/filterSlice";

export type IPropsProfessionals = {
  items: ProfessionalDetails[];
};

const CandidateV1FilterArea = ({ items }: IPropsProfessionals) => {
  const dispatch = useAppDispatch();
  // handleReset
  const handleReset = () => {
    dispatch(resetFilter());
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
      <div className="main-title fw-500 text-dark">Filter By</div>
      <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
        <div className="filter-block bottom-line pb-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseSemploye"
            role="button"
            aria-expanded="false"
          >
            Name or Keyword
          </a>
          <div className="collapse show" id="collapseSemploye">
            <div className="main-body">
              <form action="#" className="input-box position-relative">
                <input type="text" placeholder="Name or keyword" />
                <button>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseCategory"
            role="button"
            aria-expanded="false"
          >
            Skill
          </a>
          <div className="collapse show" id="collapseCategory">
            <div className="main-body">
              <FilterSkills />
            </div>
          </div>
        </div>

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
              <FilterCandidateLocation items={items} />
            </div>
          </div>
        </div>
        {/* 
        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseSalary"
            role="button"
            aria-expanded="false"
          >
            Salary Range
          </a>
          <div className="collapse" id="collapseSalary">
            <JobPrices
              priceValue={priceValue}
              setPriceValue={setPriceValue}
              maxPrice={50000}
            />
          </div>
        </div> */}

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

export default CandidateV1FilterArea;
