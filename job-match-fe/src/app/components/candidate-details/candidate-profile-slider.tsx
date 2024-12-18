"use client";
import React from "react";
import Slider from "react-slick";
import ApplicationGridItem from "../job-application/grid/application-grid-item";
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
    centerPadding: "0%",
    slidesToShow: 2,
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
          {/* <a href="#" className="w-100 d-blok"> */}
          <ApplicationGridItem item={item} />
          {/* </a> */}
        </div>
      ))}
    </Slider>
  );
};

export default CandidateProfileSlider;
