import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import JobAdArea from "../components/job-ad/ad-area";

export const metadata: Metadata = {
  title: "Create Job Ad",
};

const CreateAdPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Create a Job Ad & find the best candidates for the job."
          subtitle=""
        />
        {/*breadcrumb end */}

        {/* register area start */}
        <JobAdArea />
        {/* register area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CreateAdPage;
