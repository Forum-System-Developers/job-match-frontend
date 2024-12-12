import React from "react";
import Link from "next/link";

const JobPortalIntro = ({ top_border = false }: { top_border?: boolean }) => {
  return (
    <section className="job-portal-intro">
      <div className="container">
        <div
          className={`wrapper bottom-border ${
            top_border ? "top-border" : ""
          } pt-100 lg-pt-80 md-pt-50 pb-65 md-pb-50`}
        >
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div
                className="text-center text-lg-start wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <h2>Professionals and companies are looking for each other</h2>
                <p className="text-md m0 md-pb-20">
                  Whether you're looking for your next assignment or the right
                  expert to complete your project, we've got you covered.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <ul className="btn-group style-none d-flex flex-wrap justify-content-center justify-content-lg-end">
                <li className="me-2">
                  <Link href="/job-ads" className="btn-three">
                    Looking for job?
                  </Link>
                </li>
                <li className="ms-2">
                  <Link href="/professionals" className="btn-four">
                    Find a pro
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPortalIntro;
