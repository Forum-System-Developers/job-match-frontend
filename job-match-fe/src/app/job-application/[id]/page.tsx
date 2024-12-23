import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import FooterOne from "@/layouts/footers/footer-one";
import JobPortalIntro from "../../components/job-portal-intro/job-portal-intro";
import JobDetailsV2Area from "../../components/job-details/job-application-details-area";
import JobDetailsBreadcrumbTwo from "../../components/jobs/breadcrumb/job-details-breadcrumb-2";

export const metadata: Metadata = {
  title: "Job Application",
};

const JobDetailsV2Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumbTwo />
        {/* job details breadcrumb end */}

        {/* job details area start */}
        <JobDetailsV2Area />
        {/* job details area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsV2Page;
