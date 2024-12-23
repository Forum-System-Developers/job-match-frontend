"use client";
import React, { useState } from "react";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import Image from "next/image";
import VideoPopup from "../common/video-popup";
import { useParams } from "next/navigation";
import { useCompany } from "../company/hooks/useCompany";
import { useLogo } from "../dashboard/employ/hooks/useLogo";
import Link from "next/link";

const CompanyDetailsArea = () => {
  const { id } = useParams();
  const { company, isLoading } = useCompany(id as string);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="company-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 order-xl-last">
              <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                <Link
                  href={`/company/${company?.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={company?.logo || profile_icon_1}
                    alt="logo"
                    className="lazy-img m-auto logo"
                    height={35}
                    width={35}
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">
                    {company?.name}
                  </div>
                </Link>
                {company?.website_url && (
                  <div className="text-center">
                    <Link
                      href={company.website_url}
                      className="website-btn-two tran3s"
                      target="_blank"
                    >
                      Visit our website
                    </Link>
                  </div>
                )}

                <div className="border-top mt-35 lg-mt-20 pt-25">
                  <ul className="job-meta-data row style-none">
                    <li className="col-12">
                      <span>Location: </span>
                      <div>{company?.address_line} </div>
                    </li>
                    <li className="col-12">
                      <span>Email: </span>
                      <div>
                        <a href="#">{company?.email}</a>
                      </div>
                    </li>

                    <li className="col-12">
                      <span>Phone:</span>
                      <div>
                        <a href="">{company?.phone_number}</a>{" "}
                      </div>
                    </li>
                    <li className="col-12">
                      <span>Currently Open Positions: </span>
                      <div>
                        <a className="me-3" href="#open-positions">
                          {company?.active_job_ads}
                        </a>
                      </div>
                    </li>
                    <li className="col-12">
                      <span>Successful matches: </span>
                      <div>
                        <a className="me-3" href="#open-positions">
                          {company?.successful_matches}
                        </a>
                      </div>
                    </li>
                    {/* <li className="col-12">
                      <span>Category: </span>
                      <div>Technology, Product, Agency</div>
                    </li> */}
                    {/* <li className="col-12">
                      <span>Social: </span>
                      <div>
                        <a href="#" className="me-3">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="me-3">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="me-3">
                          <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </li> */}
                  </ul>

                  <a
                    href="#"
                    className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8 order-xl-first">
              <div className="details-post-data me-xxl-5 pe-xxl-4">
                <h3>Company Description</h3>
                {company?.description ? (
                  company.description
                    .split(/\n+/)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                ) : (
                  <p>No description provided</p>
                )}
                {company?.website_url && (
                  <>
                    <h3>Intro</h3>
                    <div className="video-post d-flex align-items-center justify-content-center mb-50">
                      <a
                        className="fancybox rounded-circle video-icon tran3s text-center"
                        onClick={() => setIsVideoOpen(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-play-fill"></i>
                      </a>
                    </div>
                  </>
                )}
                {/* <div className="position-relative">
                  <h3>Company Reviews</h3>

                  <CompanyReviews />
                </div> */}

                <div className="share-option mt-60">
                  <ul className="style-none d-flex align-items-center">
                    <li className="fw-500 me-2">Share: </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                  </ul>
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
        videoId={company?.youtube_video_id || ""}
      />
      {/* video modal end */}
    </>
  );
};

export default CompanyDetailsArea;
