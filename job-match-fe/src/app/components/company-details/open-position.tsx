"use client";
import React from "react";
import ListItemTwo from "../jobs/list/list-item-2";
import { useParams } from "next/navigation";
import { useAdsCompany } from "../company/hooks/useAds";

const OpenPosition = () => {
  const { id } = useParams();
  const { ads, loading } = useAdsCompany(id as string);

  const job_items = ads.slice(0, 4);
  return (
    <section
      className="company-open-position pt-80 lg-pt-60 pb-100 lg-pb-60"
      id="open-positions"
    >
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-two">
              <h2>Open Positions</h2>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <a href="#" className="btn-six">
                Explore More
              </a>
            </div>
          </div>
        </div>
        <div className="mt-50">
          {job_items.map((item) => (
            <ListItemTwo key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPosition;
