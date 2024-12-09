"use client";
import React, { useState } from "react";
import CandidateAside from "./aside";
import DashboardArea from "./dashboard-area";
import { useUser } from "@/hooks/use-user";
import { useProfessional } from "../../candidate-details/hooks/useProfessional";
const CandidateDashboardMain = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const { user, loading, error } = useUser();
  const { professional } = useProfessional(user?.id as string);

  const userId = user?.id;

  return (
    <div className="main-page-wrapper">
      {/* aside start */}
      <CandidateAside
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
        professional={professional ? professional : null}
      />
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardArea
        setIsOpenSidebar={setIsOpenSidebar}
        userId={userId}
        professional={professional ? professional : null}
      />
      {/* dashboard area end */}
    </div>
  );
};

export default CandidateDashboardMain;
