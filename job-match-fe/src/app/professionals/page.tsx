import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobBreadcrumb from "../components/jobs/breadcrumb/job-breadcrumb";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CandidateV1Area from "../components/candidate/candidate-v1-area";
import FooterOne from "@/layouts/footers/footer-one";

export const metadata: Metadata = {
  title: "All Professionals",
};

const CandidatePage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb
          title="Candidates"
          subtitle="Explore top talent and achieve your goals"
        />
        {/* search breadcrumb end */}

        {/* candidate area start */}
        <CandidateV1Area itemsPerPage={6} />
        {/* candidate area end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CandidatePage;
