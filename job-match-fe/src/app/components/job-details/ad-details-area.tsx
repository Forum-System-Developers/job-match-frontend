"use client";
import React, { useState } from "react";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAd } from "../company/hooks/useAd";
import NiceSelect, { Option } from "@/ui/nice-select";
import { sendMatchRequestToJobAd } from "@/services/matching";
import { useJobApplicationsProfessional } from "../jobs/hooks/useJobApplications";
import { getUserLocal, role } from "@/services/auth_service";
import Link from "next/link";
import { useCompany } from "../company/hooks/useCompany";

const JobDetailsV1Area = () => {
  const [selectedJobApplication, setselectedJobApplication] =
    useState<Option | null>(null);

  const { id } = useParams();
  const { ad } = useAd(id as string);
  const user = getUserLocal();
  const { jobApplications } = useJobApplicationsProfessional(
    user?.id as string
  );
  const { company } = useCompany(ad?.company_id as string);
  const [open, setOpen] = useState(false);
  const job = ad;

  const options =
    jobApplications?.map((application) => ({
      value: application.id,
      label: application.name,
    })) || [];

  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8">
            <div className="details-post-data me-xxl-5 pe-xxl-4">
              <div>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(ad?.created_at || Date.now()))}{" "}
              </div>
              <h3 className="post-title">{job?.title}</h3>

              <div className="post-block border-style mt-50 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    1
                  </div>
                  <h4 className="block-title">Company Description</h4>
                </div>
                {company?.description ? (
                  company.description
                    .split(/\n+/)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                ) : (
                  <p>No description provided</p>
                )}
              </div>
              <div className="post-block border-style mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    2
                  </div>
                  <h4 className="block-title">Job Description</h4>
                </div>
                {ad?.description ? (
                  ad.description
                    .split(/\n+/)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                ) : (
                  <p>No description provided</p>
                )}
              </div>
              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    3
                  </div>
                  <h4 className="block-title">Skills required:</h4>
                </div>
                <ul className="list-type-one style-none mb-15">
                  {ad?.skills &&
                    ad.skills.map((t, i) => <li key={i}>{t.name}</li>)}
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
                <Link
                  href={`/company/${ad?.company_id}`}
                  className="title fw-500 tran3s"
                >
                  {job?.company_name}
                </Link>
              </div>
              {ad?.company_website && (
                <a
                  href={`${ad.company_website}`}
                  className="website-btn tran3s"
                >
                  Visit website
                </a>
              )}

              <div className="border-top mt-40 pt-40">
                <ul className="job-meta-data row style-none">
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Min Salary </span>
                    <div>{job?.min_salary} BGN</div>
                  </li>
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Max Salary </span>
                    <div>{job?.max_salary} BGN</div>
                  </li>

                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Location</span>
                    <div>{job?.city} </div>
                  </li>

                  <li
                    className="col-xl-5 col-md-4 col-sm-6"
                    style={{ minWidth: "100%" }}
                  >
                    <span>Experience</span>
                    <div>{job?.skill_level}</div>
                  </li>
                </ul>
                <div className="job-tags d-flex flex-wrap pt-15">
                  {job?.skills &&
                    job?.skills.map((t, i) => (
                      <a key={i} href="" style={{ cursor: "default" }}>
                        {t.name}
                      </a>
                    ))}
                </div>
                {role() === "professional" && (
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
                      <div
                        className="match-request-form mt-30"
                        style={{
                          maxWidth: "300px",
                        }}
                      >
                        <NiceSelect
                          options={options}
                          defaultCurrent={null}
                          placeholder="Select Job Ad"
                          onChange={(item) => {
                            setselectedJobApplication(item);
                          }}
                          name="Location"
                        />
                      </div>
                    )}
                    {selectedJobApplication && (
                      <button
                        className="btn-ten fw-500 text-white text-center tran3s mt-30"
                        onClick={() => {
                          sendMatchRequestToJobAd({
                            jobAdId: id as string,
                            jobApplicationId:
                              selectedJobApplication.value as string,
                          });

                          setselectedJobApplication(null);
                        }}
                      >
                        Confirm Match Request
                      </button>
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
