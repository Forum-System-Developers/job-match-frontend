"use client";
import React, { useState } from "react";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAd } from "../company/hooks/useAd";
import NiceSelect from "@/ui/nice-select";
import { sendMatchRequestToJobAd } from "@/services/matching";
import { useJobApplicationsProfessional } from "../jobs/hooks/useJobApplications";
import { role } from "@/utils/auth_utils";

const JobDetailsV1Area = () => {
  const { id } = useParams();
  const { ad } = useAd(id as string);
  const { jobApplications } = useJobApplicationsProfessional();
  const [open, setOpen] = useState(false);
  const job = ad;

  const options = jobApplications.map((application) => ({
    value: application.id,
    label: application.name,
  }));

  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8">
            <div className="details-post-data me-xxl-5 pe-xxl-4">
              <div className="post-date">
                {job?.created_at} by{" "}
                <a href="#" className="fw-500 text-dark">
                  {job?.company_name}
                </a>
              </div>
              <h3 className="post-title">{job?.title}</h3>
              <ul className="share-buttons d-flex flex-wrap style-none">
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-facebook"></i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-twitter"></i>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-link-45deg"></i>
                    <span>Copy</span>
                  </a>
                </li>
              </ul>

              <div className="post-block border-style mt-50 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    1
                  </div>
                  <h4 className="block-title">Overview</h4>
                </div>
                <p>{job?.description}</p>
              </div>
              <div className="post-block border-style mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    2
                  </div>
                  <h4 className="block-title">Job Description</h4>
                </div>
                <p>
                  As a <a href="#">Product Designer</a> at WillowTree, you’ll
                  give form to ideas by being the voice and owner of product
                  decisions. You’ll drive the design direction, and then make it
                  happen!
                </p>
                <p>
                  We understand our responsibility to create a diverse,
                  equitable, and inclusive place within the tech industry, while
                  pushing to make our industry more representative.{" "}
                </p>
              </div>
              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    3
                  </div>
                  <h4 className="block-title">Responsibilities</h4>
                </div>
                <ul className="list-type-one style-none mb-15">
                  <li>
                    Collaborate daily with a multidisciplinary team of Software
                    Engineers, Researchers, Strategists, and Project Managers.
                  </li>
                  <li>
                    Co-lead ideation sessions, workshops, demos, and
                    presentations with clients on-site
                  </li>
                  <li>
                    Push for and create inclusive, accessible design for all
                  </li>
                  <li>
                    Maintain quality of the design process and ensure that when
                    designs are translated into code they accurately reflect the
                    design specifications.
                  </li>
                  <li>
                    Sketch, wireframe, build IA, motion design, and run
                    usability tests
                  </li>
                  <li>
                    Design pixel perfect responsive UI’s and understand that
                    adopting common interface pattern is better for UX than
                    reinventing the wheel
                  </li>
                  <li>
                    Ensure content strategy and design are perfectly in-sync
                  </li>
                  <li>
                    Give and receive design critique to help constantly refine
                    and push our work
                  </li>
                </ul>
              </div>
              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    4
                  </div>
                  <h4 className="block-title">Required Skills:</h4>
                </div>
                <ul className="list-type-two style-none mb-15">
                  <li>You’ve been designing digital products for 2+ years.</li>
                  <li>
                    A portfolio that exemplifies strong visual design and a
                    focus on defining the user experience.
                  </li>
                  <li>You’ve proudly shipped and launched several products.</li>
                  <li>
                    You have some past experience working in an agile
                    environment – Think two-week sprints.
                  </li>
                  <li>
                    Experience effectively presenting and communicating your
                    design decisions to clients and team members
                  </li>
                  <li>
                    Up-to-date knowledge of design software like Figma, Sketch
                    etc.
                  </li>
                </ul>
              </div>
              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    5
                  </div>
                  <h4 className="block-title">Benefits:</h4>
                </div>
                <ul className="list-type-two style-none mb-15">
                  <li>We are a remote-first company.</li>
                  <li>
                    100% company-paid health insurance premiums for you & your
                    dependents
                  </li>
                  <li>Vacation stipend</li>
                  <li>Unlimited paid vacation and paid company holidays</li>
                  <li>Monthly wellness/gym stipend</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4">
            <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
              <Image
                src={job?.company_logo || profile_icon_1}
                alt="logo"
                className="lazy-img m-auto logo"
                width={60}
                height={60}
              />
              <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                {job?.company_name}
              </div>
              <a href="#" className="website-btn tran3s">
                Visit website
              </a>

              <div className="border-top mt-40 pt-40">
                <ul className="job-meta-data row style-none">
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Salary</span>
                    <div>
                      {job?.min_salary}/{job?.max_salary}
                    </div>
                  </li>

                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Location</span>
                    <div>{job?.city_name}</div>
                  </li>
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Date</span>
                    <div>{job?.created_at} </div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Experience</span>
                    <div>{job?.skill_level}</div>
                  </li>
                </ul>
                <div className="job-tags d-flex flex-wrap pt-15">
                  {job?.requirements &&
                    job?.requirements.map((t, i) => (
                      <a key={i} href="#">
                        {t}
                      </a>
                    ))}
                </div>
                {role === "professional" && (
                  <>
                    <a
                      href="#"
                      className="btn-one w-100 mt-25"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen((prevState: boolean) => !prevState);
                      }}
                    >
                      Send Match Request
                    </a>
                    {open && (
                      <div className="match-request-form mt-30">
                        <NiceSelect
                          options={options}
                          defaultCurrent={0}
                          onChange={(item) => {
                            sendMatchRequestToJobAd({
                              jobAdId: id as string,
                              jobApplicationId: item.value as string,
                            });
                          }}
                          name="Location"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsV1Area;