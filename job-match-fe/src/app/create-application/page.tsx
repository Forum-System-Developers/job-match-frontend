import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import ApplicationArea from "../components/job-application/application-area";

export const metadata: Metadata = {
  title: "Create Job Application",
};

const CreateApplicationPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Create your Job Application & start applying for jobs."
          subtitle="You can create multiple applications tailored for different job ads, and you can select a primary one if you wish."
        />
        {/*breadcrumb end */}

        {/* register area start */}
        <ApplicationArea />
        {/* register area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CreateApplicationPage;
