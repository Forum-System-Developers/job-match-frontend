"use client";
import React, { useState } from "react";
import Image from "next/image";
import CandidateProfileSlider from "./candidate-profile-slider";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import VideoPopup from "../common/video-popup";
import Skills from "./skills";
import WorkExperience from "./work-experience";
import CandidateBio from "./bio";
import EmailSendForm from "../forms/email-send-form";
import { useProfessional } from "../candidate-details/hooks/useProfessional";
import { usePhoto } from "../dashboard/candidate/hooks/usePhoto";
import { useParams } from "next/navigation";
import { getCV } from "../dashboard/candidate/data/professional-data";

const CandidateDetailsArea = () => {
  const { id } = useParams();

  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const { professional, loading: professionalLoading } = useProfessional(
    id as string
  );
  const { photoUrl, loading: photoLoading } = usePhoto(id as string);

  const fetchCV = async () => {
    const cvResponse = await getCV(id as string);
    const CV = cvResponse?.file;

    if (CV) {
      const downloadLink = document.createElement("a");
      const url = window.URL.createObjectURL(CV);
      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `${professional?.first_name}_${professional?.last_name}_Rephera_CV.pdf`
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error: CV could not be fetched.");
    }
  };

  return (
    <>
      <section className="candidates-profile pt-100 lg-pt-70 pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-lg-8">
              <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                <div className="inner-card border-style mb-65 lg-mb-40">
                  <h3 className="title">Overview</h3>
                  <p>
                    Hello my name is Ariana Gande Connor and I’m a Financial
                    Supervisor from Netherlands, Rotterdam. In pharetra orci
                    dignissim, blandit mi semper, ultricies diam. Suspendisse
                    malesuada suscipit nunc non volutpat. Sed porta nulla id
                    orci laoreet tempor non consequat enim. Sed vitae aliquam
                    velit. Aliquam Integer vehicula rhoncus molestie. Morbi
                    ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
                    Suspendisse condimentum lorem ut elementum aliquam.{" "}
                  </p>{" "}
                  <br />
                  <p>
                    Mauris nec erat ut libero vulputate pulvinar. Aliquam ante
                    erat, blandit at pretium et, accumsan ac est. Integer
                    vehicula rhoncus molestie. Morbi ornare ipsum sed sem
                    condimentum, et pulvinar tortor luctus. Suspendisse
                    condimentum lorem ut elementum aliquam. Mauris nec.
                  </p>
                </div>
                <h3 className="title">Intro</h3>
                <div className="video-post d-flex align-items-center justify-content-center mt-25 lg-mt-20 mb-75 lg-mb-50">
                  <a
                    onClick={() => setIsVideoOpen(true)}
                    className="fancybox rounded-circle video-icon tran3s text-center cursor-pointer"
                  >
                    <i className="bi bi-play"></i>
                  </a>
                </div>
                <div className="inner-card border-style mb-75 lg-mb-50">
                  <h3 className="title">Education</h3>
                  <div className="time-line-data position-relative pt-15">
                    <div className="info position-relative">
                      <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                        1
                      </div>
                      <div className="text_1 fw-500">University of Boston</div>
                      <h4>Bachelor Degree of Design</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum primis
                      </p>
                    </div>
                    <div className="info position-relative">
                      <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                        2
                      </div>
                      <div className="text_1 fw-500">Design Collage</div>
                      <h4>UI/UX Design Course</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="inner-card border-style mb-75 lg-mb-50">
                  <h3 className="title">Skills</h3>
                  {/* skill area */}
                  <Skills itemId={id as string} />
                  {/* skill area */}
                </div>
                <div className="inner-card border-style mb-60 lg-mb-50">
                  <h3 className="title">Work Experience</h3>
                  {/* WorkExperience */}
                  <WorkExperience />
                  {/* WorkExperience */}
                </div>
                <h3 className="title">Portfolio</h3>
                {/* Candidate Profile Slider */}
                <CandidateProfileSlider />
                {/* Candidate Profile Slider */}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4">
              <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                <div className="cadidate-bio bg-wrapper bg-color mb-60 md-mb-40">
                  <div className="pt-25">
                    <div className="cadidate-avatar m-auto">
                      <Image
                        src={photoUrl ? photoUrl : profile_icon_1}
                        height={85}
                        width={85}
                        alt="avatar"
                        className="lazy-img rounded-circle w-100"
                      />
                    </div>
                  </div>
                  <h3 className="cadidate-name text-center">
                    {professional?.first_name} {professional?.last_name}
                  </h3>
                  <div className="text-center pb-25">
                    <a href="#" className="invite-btn fw-500">
                      Invite
                    </a>
                  </div>
                  {/* CandidateBio */}
                  <CandidateBio professional={professional} />
                  {/* CandidateBio */}
                  <a
                    href="#"
                    onClick={fetchCV}
                    className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                  >
                    Download CV
                  </a>
                </div>
                <h4 className="sidebar-title">Location</h4>
                <div className="map-area mb-60 md-mb-40">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
                <h4 className="sidebar-title">Email James Brower.</h4>
                <div className="email-form bg-wrapper bg-color">
                  <p>
                    Your email address & profile will be shown to the recipient.
                  </p>
                  <EmailSendForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-CQBG3OepJXc"}
      />
      {/* video modal end */}
    </>
  );
};

export default CandidateDetailsArea;
