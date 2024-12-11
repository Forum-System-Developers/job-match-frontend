"use client";
import React from "react";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useJobApplication } from "../hooks/useJobApplications";

const JobDetailsBreadcrumbTwo = () => {
  const { id } = useParams();
  const { jobApplication } = useJobApplication(id as string);
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="title-two">
                <h2 className="text-white">{jobApplication?.name}</h2>
              </div>
              <div className="post-date">
                by{" "}
                <a
                  href={`/candidate/${jobApplication?.professional_id}`}
                  className="fw-500 text-white"
                >
                  {jobApplication?.first_name} {jobApplication?.last_name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default JobDetailsBreadcrumbTwo;
