import React from "react";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import JobRequestItem from "./job-request-item";
import { useMatchRequests } from "./hooks/useMatchRequests";
import { JobAdResponse } from "@/data/job-ad-data";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const MatchRequestsArea = ({ setIsOpenSidebar }: IProps) => {
  const { requests, loading } = useMatchRequests();

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Match Requests</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="table-responsive">
            <table className="table job-alert-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Alert </th>
                  <th scope="col">Job</th>
                  <th scope="col">Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {requests.map((request: JobAdResponse) => (
                  <JobRequestItem key={request.id} request={request} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>..</li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchRequestsArea;
