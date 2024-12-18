"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import icon_1 from "@/assets/images/icon/icon_52.svg";
import icon_2 from "@/assets/images/icon/icon_53.svg";
import icon_3 from "@/assets/images/icon/icon_54.svg";
import icon_4 from "@/assets/images/icon/icon_55.svg";
import icon_5 from "@/assets/images/icon/icon_56.svg";
import { useJobApplication } from "../jobs/hooks/useJobApplications";
import { getUserLocal, role } from "@/services/auth_service";
import { useAdsCompany } from "../company/hooks/useAds";
import NiceSelect, { Option } from "@/ui/nice-select";
import { sendMatchRequestToJobApplication } from "@/services/matching";
import { useProfessional } from "../candidate-details/hooks/useProfessional";

const JobDetailsV2Area = () => {
  const [selectedJobAd, setSelectedJobAd] = useState<Option | null>(null);
  const { id } = useParams();
  const { jobApplication } = useJobApplication(id as string);
  const { professional, isLoading } = useProfessional(
    jobApplication?.professional_id as string
  );
  const [open, setOpen] = useState(false);
  const user = getUserLocal();
  const { ads } = useAdsCompany(user?.id as string);
  const [result, setResult] = useState<string | "">("");

  const options = ads.map((ad) => ({
    value: ad.id,
    label: ad.title,
  }));

  const skills = jobApplication?.skills.flatMap((group) => group).slice(0, 4);

  const handleSendMatchRequest = async ({
    jobAdId,
    jobApplicationId,
  }: {
    jobAdId: string;
    jobApplicationId: string;
  }) => {
    try {
      const result = await sendMatchRequestToJobApplication({
        jobAdId,
        jobApplicationId,
      });
      setResult(result.message);
    } catch (error) {
      setResult("Match request already sent");
      throw new Error("Error sending match request:" + error);
    }
  };

  return (
    <section className="job-details style-two pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-10 m-auto">
            <div className="details-post-data ps-xxl-4 pe-xxl-4">
              <ul className="job-meta-data-two d-flex flex-wrap justify-content-center justify-content-lg-between style-none">
                <div
                  className="bg-wrapper bg-white text-center"
                  style={{
                    width: "160px",
                    maxHeight: "270px",
                  }}
                >
                  <Image
                    src={icon_1}
                    alt="icon"
                    className="lazy-img m-auto icon"
                  />
                  <span>Min / Max Salary</span>
                  <div>{jobApplication?.min_salary}BGN -</div>
                  <div>{jobApplication?.max_salary}BGN</div>
                </div>
                <div
                  className="bg-wrapper bg-white text-center"
                  style={{
                    width: "180px",
                    maxHeight: "270px",
                  }}
                >
                  <Image
                    src={icon_2}
                    alt="icon"
                    className="lazy-img m-auto icon"
                  />
                  <span>Skills</span>
                  <div className="job-tags d-flex flex-wrap pt-15">
                    {skills?.slice(0, 2).map((skill, i) => (
                      <div
                        key={i}
                        style={{
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {skill.name} <br />
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="bg-wrapper bg-white text-center"
                  style={{
                    width: "150px",
                    maxHeight: "270px",
                  }}
                >
                  <Image
                    src={icon_3}
                    alt="icon"
                    className="lazy-img m-auto icon"
                  />
                  <span>Location</span>
                  <div>{jobApplication?.city} </div>
                </div>
                <div
                  className="bg-wrapper bg-white text-center"
                  style={{
                    width: "150px",
                    maxHeight: "270px",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={icon_4}
                    alt="icon"
                    className="lazy-img m-auto icon"
                  />
                  <span>Category</span>
                  <div>{jobApplication?.category_title}</div>
                </div>
                <div
                  className="bg-wrapper bg-white text-center"
                  style={{
                    width: "150px",
                    maxHeight: "270px",
                  }}
                >
                  <Image
                    src={icon_5}
                    alt="icon"
                    className="lazy-img m-auto icon"
                  />
                  <span>Posted </span>
                  <div>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(
                      new Date(jobApplication?.created_at || Date.now())
                    )}{" "}
                  </div>
                </div>
              </ul>

              <div className="post-block mt-50 lg-mt-40">
                <h4 className="block-title">Professional Description</h4>
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
              <div className="post-block mt-60 lg-mt-40">
                <h4 className="block-title">Application Description</h4>
                {jobApplication?.description ? (
                  jobApplication.description
                    .split(/\n+/)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                ) : (
                  <p>No description provided</p>
                )}
              </div>

              <div className="post-block mt-55 lg-mt-40">
                <h4 className="block-title">Skills:</h4>
                <ul className="list-type-two style-none mb-15">
                  {jobApplication?.skills.map((skill, i) => (
                    <li key={i}>{skill.name}</li>
                  ))}
                </ul>
              </div>

              {role() === "company" && (
                <>
                  <a
                    href="#"
                    className="btn-ten fw-500 text-white text-center tran3s mt-30"
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
                          setSelectedJobAd(item);
                        }}
                        name="Location"
                      />
                    </div>
                  )}
                  {selectedJobAd && (
                    <>
                      {result && (
                        <div
                          style={{
                            color:
                              result === "Match request already sent"
                                ? "red"
                                : "green",
                            textAlign: "left",
                            marginTop: "1%",
                            padding: "10px",
                            fontWeight: "450",
                          }}
                        >
                          {result}
                        </div>
                      )}
                      <button
                        className="btn-ten fw-500 text-white text-center tran3s mt-30"
                        onClick={() => {
                          handleSendMatchRequest({
                            jobAdId: selectedJobAd.value as string,
                            jobApplicationId: id as string,
                          });
                        }}
                      >
                        Confirm Match Request
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsV2Area;
