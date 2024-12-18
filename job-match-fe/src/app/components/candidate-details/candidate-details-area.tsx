"use client";
import React, { useEffect, useState } from "react";
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
import { getCV } from "../../../data/professional-data";

const CandidateDetailsArea = () => {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);

  const { professional } = useProfessional(id as string);
  const photoUrl = professional?.photo;

  const fetchCV = async () => {
    try {
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
      }
    } catch (error) {
      setError("Failed to download CV");
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
                  <h3 className="title">Professional Description</h3>
                  {professional?.description ? (
                    professional.description
                      .split(/\n+/)
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph.trim()}</p>
                      ))
                  ) : (
                    <p>No description provided</p>
                  )}
                </div>
                <div className="inner-card border-style mb-75 lg-mb-50">
                  <h3 className="title">Skills</h3>
                  {/* skill area */}
                  <Skills itemId={id as string} />
                  {/* skill area */}
                </div>
                {/* <div className="inner-card border-style mb-60 lg-mb-50">
                  <h3 className="title">Work Experience</h3>
                  <WorkExperience />
                </div> */}{" "}
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4">
              <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                <div
                  className="cadidate-bio bg-wrapper bg-color mb-60 md-mb-40"
                  style={{
                    minWidth: "fit-content",
                  }}
                >
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

                  {/* CandidateBio */}
                  <CandidateBio professional={professional} />
                  {/* CandidateBio */}
                  <a
                    href=""
                    onClick={fetchCV}
                    className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                  >
                    Download CV
                  </a>
                  {error && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "left",
                        marginTop: "1%",
                        padding: "10px",
                        fontWeight: "450",
                      }}
                    >
                      {error}
                    </div>
                  )}
                </div>
                {/* <h4 className="sidebar-title">
                  Email {professional?.first_name}.
                </h4>
                <div className="email-form bg-wrapper bg-color">
                  <p>
                    Your email address & profile will be shown to the recipient.
                  </p>
                  <EmailSendForm />
                </div> */}
              </div>
            </div>
            <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
              <div
                className="inner-card border-style mb-60 lg-mb-50"
                style={{
                  padding: "10%",
                }}
              >
                <h3 className="title">Active Aplications</h3>

                <CandidateProfileSlider candidateId={id as string | null} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandidateDetailsArea;
