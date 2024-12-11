import React from "react";
import { JobExperienceItems } from "../job-experience";
import { JobAdResponse } from "@/data/job-ad-data";
import { JobApplication } from "@/data/job-applications-data";

const FilterExperience = ({ items }: { items: JobAdResponse[] }) => {
  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">
        Experience Level :
      </div>
      <div className="main-body ps-xl-4 flex-fill">
        <ul className="style-none filter-input">
          <JobExperienceItems showLength={false} ads={items} />
        </ul>
      </div>
    </div>
  );
};

export default FilterExperience;
