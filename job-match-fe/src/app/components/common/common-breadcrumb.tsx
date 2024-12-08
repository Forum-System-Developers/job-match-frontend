"use client";
import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import { useParams } from "next/navigation";
import { useCompany } from "../company/hooks/useCompany";

const CommonBreadcrumb = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const { id } = useParams();
  const { company } = useCompany(id as string);
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-6 m-auto text-center">
              <div className="title-two">
                <h2 className="text-white">{company?.name}</h2>
              </div>
              <p className="text-lg text-white mt-30 lg-mt-20">
                {company?.address_line}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default CommonBreadcrumb;
