import React from "react";
import Wrapper from "@/layouts/wrapper";
import { Metadata } from "next";

import Header from "@/layouts/headers/header";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Job Details",
};

const JobDetailsDynamicPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb />
        {/* job details breadcrumb end */}

        {/* job details area start */}
        {<JobDetailsV1Area />}
        {/* job details area end */}

        {/* related job start */}
        {/* {<RelatedJobs category={job.category} />} */}
        {/* related job end */}

        {/* job portal intro start */}
        {/* <JobPortalIntro /> */}
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsDynamicPage;
