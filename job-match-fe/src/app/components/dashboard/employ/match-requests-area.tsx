import React from "react";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import JobRequestItem from "./job-request-item";
import { useMatchRequestsCompany } from "./hooks/useMatchRequestsCompany";
import { MatchRequestApplication } from "@/data/match-data";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const MatchRequestsArea = ({ setIsOpenSidebar }: IProps) => {
  const { matchRequests, isLoading } = useMatchRequestsCompany();

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          {/* <h2 className="main-title m0">Match Requests</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <ShortSelect />
          </div> */}
        </div>

        <div className="bg-white card-box border-20">
          <div className="table-responsive">
            <table className="table job-alert-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description </th>
                  <th scope="col">Min Salary</th>
                  <th scope="col">Max Salary</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {matchRequests.map((request: MatchRequestApplication) => (
                  <JobRequestItem key={request.job_ad_id} request={request} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-pagination d-flex justify-content-end mt-30"></div>
      </div>
    </div>
  );
};

export default MatchRequestsArea;
