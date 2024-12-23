"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import { useParams } from "next/navigation";
import { useProfessional } from "./hooks/useProfessional";

const ProfileBreadcrumb = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const { id } = useParams();
  const { professional } = useProfessional(id as string);
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div
              className="col-xl-6 m-auto text-center"
              style={{
                width: "100%",
              }}
            >
              <div className="title-two">
                <h2 className="text-white">
                  {professional?.first_name} {professional?.last_name}
                </h2>
              </div>
              <ul className="style-none d-flex justify-content-center page-pagination mt-15">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                </li>
                <li>{subtitle}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default ProfileBreadcrumb;
