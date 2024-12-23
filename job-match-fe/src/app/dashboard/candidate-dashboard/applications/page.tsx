"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import ActiveApplicationsArea from "@/app/components/dashboard/candidate/active-applications-area";

const CandidateActiveApplicationsPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job alert area start */}
        <ActiveApplicationsArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* job alert area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateActiveApplicationsPage;
