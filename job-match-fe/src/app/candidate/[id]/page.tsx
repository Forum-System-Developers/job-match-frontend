import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CandidateProfileBreadcrumb from "../../components/candidate-details/profile-bredcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import CandidateDetailsArea from "../../components/candidate-details/candidate-details-area";

export const metadata: Metadata = {
  title: "Professional Profile",
};

const CandidateProfileDetailsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumb
          title="Candidate Profile"
          subtitle="Candidate Profile"
        />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        <CandidateDetailsArea />
        {/* candidate details area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileDetailsPage;
