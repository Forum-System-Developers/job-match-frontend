"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import port_1 from "@/assets/images/candidates/CP_01.jpg";
import port_2 from "@/assets/images/candidates/CP_02.jpg";
import port_3 from "@/assets/images/candidates/CP_03.jpg";
import port_4 from "@/assets/images/candidates/CP_02.jpg";
import ApplicationGridItem from "../job-application/grid/application-grid-item";
import { useParams } from "next/navigation";
import { useJobApplicationsProfessional } from "../jobs/hooks/useJobApplications";

const CandidateProfileSlider = ({
  candidateId,
}: {
  candidateId: string | null;
}) => {
  // slider setting
  const slider_setting = {
    dots: true,
    arrows: false,
    infinite: false,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { jobApplications } = useJobApplicationsProfessional(
    candidateId as string
  );
  return (
    <Slider {...slider_setting} className="candidate-portfolio-slider">
      {jobApplications?.map((item, i) => (
        <div className="item" key={i}>
          <a href="#" className="w-100 d-blok">
            <ApplicationGridItem item={item} />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default CandidateProfileSlider;
