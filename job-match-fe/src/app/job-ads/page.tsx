import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobBreadcrumb from "../components/jobs/breadcrumb/job-breadcrumb";
import JobListThree from "../components/jobs/list/job-list-three";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";

export const metadata: Metadata = {
  title: "Job Postings",
};

const JobListOnePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb />
        {/* search breadcrumb end */}

        {/* job list three start */}
        <JobListThree itemsPerPage={5} />
        {/* job list three end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobListOnePage;
