import React, { useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-item";
import EmployShortSelect from "./short-select";
import { useAdsCompany } from "../../company/hooks/useAds";
import { getUserLocal } from "@/services/auth_service";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployJobArea = ({ setIsOpenSidebar }: IProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const user = getUserLocal();
  const userId = user?.id || "";
  const { ads, isLoading: companyLoading } = useAdsCompany(userId || "");

  if (companyLoading) {
    return <div>Loading...</div>;
  }

  const filteredAds = selectedStatus
    ? ads.filter((ad) => ad.status === selectedStatus.toLowerCase())
    : ads;

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Job Ads</h2>
          <div className="d-flex ms-auto xs-mt-30">
            <div className="short-filter d-flex align-items-center ms-auto">
              <div className="text-dark fw-500 me-2">Show:</div>
              <EmployShortSelect
                onStatusChange={(status) => setSelectedStatus(status)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="a1" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Category</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {filteredAds && filteredAds.length > 0 ? (
                      filteredAds.map((ad) => (
                        <EmployJobItem key={ad.id} ad={ad} status={ad.status} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>No ads found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

export default EmployJobArea;
