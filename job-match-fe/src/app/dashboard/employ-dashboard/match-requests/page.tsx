"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import MatchRequestsArea from "@/app/components/dashboard/employ/match-requests-area";
import EmployAside from "@/app/components/dashboard/employ/aside";

const CandidateMatchRequestsPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job alert area start */}
        <MatchRequestsArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* job alert area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateMatchRequestsPage;
