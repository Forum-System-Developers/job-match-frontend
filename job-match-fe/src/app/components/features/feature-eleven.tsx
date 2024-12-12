"use client";
import React, { useState } from "react";
import AccordionItem from "../accordion/accordion-item";
import VideoPopup from "../common/video-popup";
import CounterOne from "../counter/counter-one";

const FeatureEleven = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section className="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-lg-5">
                  <div className="title-one mt-30 md-mb-40">
                    <h2 className="fw-500">
                      We are a team of motivated software developers.
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6 ms-auto">
                  <div className="wow fadeInRight">
                    <div
                      className="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4"
                      id="accordionOne"
                    >
                      <AccordionItem
                        id="one"
                        isShow={true}
                        title="Who we are?"
                        desc="Meet team HAM: Hris, Antoanet and Miki and we go HAM on assignments. Hris is our backend wizard, Miki is our DevOps ninja and Toni is our frontend pro."
                        parent="accordionOne"
                      />
                      <AccordionItem
                        id="two"
                        title="What’s our goal"
                        desc="We are a team of driven software developers who are passionate about learning, growing and creating amazing software. We are always looking for new opportunities and don't back down on a challenge!"
                        parent="accordionOne"
                      />
                      <AccordionItem
                        id="three"
                        title="Our vision"
                        desc="Our vision is centered on continuous improvement—both individually and as a team. Each of us brings unique skills and perspectives to the table, allowing us to tackle challenges creatively and effectively. We thrive by sharing ideas openly, building on one another’s strengths, and trusting each other to deliver our best work. Together, we aim to grow, innovate, and make a meaningful impact."
                        parent="accordionOne"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="video-post d-flex align-items-center justify-content-center mt-100 lg-mt-50 mb-50 lg-mb-30">
                <a
                  onClick={() => setIsVideoOpen(true)}
                  className="fancybox rounded-circle video-icon tran3s text-center cursor-pointer"
                >
                  <i className="bi bi-play"></i>
                </a>
              </div> */}
              <div className="border-bottom pb-50 lg-pb-10">
                <div className="row">
                  {/* counter */}
                  <CounterOne style_3={true} />
                  {/* counter */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-6ZbrfSRWKc"}
      /> */}
      {/* video modal end */}
    </>
  );
};

export default FeatureEleven;
