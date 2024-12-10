import React from "react";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import { useJobApplicationsProfessional } from "../../jobs/hooks/useJobApplications";
import { JobApplication } from "@/data/job-applications-data";
import JobApplicationItem from "./job-application-item";
import { getUserLocal } from "@/services/auth_service";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActiveApplicationsArea = ({ setIsOpenSidebar }: IProps) => {
  const user = getUserLocal();
  const { jobApplications, isLoading: JobAppLoading } =
    useJobApplicationsProfessional(user?.id as string);

  if (JobAppLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Active Applications</h2>
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
                  <th scope="col">Name</th>
                  <th scope="col">Description </th>
                  <th scope="col">Min Salary</th>
                  <th scope="col">Max Salary</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {jobApplications?.map((application: JobApplication) => (
                  <JobApplicationItem
                    key={application.id}
                    application={application}
                  />
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

export default ActiveApplicationsArea;
