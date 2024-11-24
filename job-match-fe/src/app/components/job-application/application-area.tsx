import React from "react";
import Image from "next/image";
import JobApplicationForm from "../forms/job-application-form";
import google from "@/assets/images/icon/google.png";
import facebook from "@/assets/images/icon/facebook.png";

const ApplicationArea = () => {
  return (
    <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
          <div className="text-center">
            <h2>Create Application</h2>
          </div>
          <div className="form-wrapper m-auto">
            <div className="tab-content mt-40">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                id="fc1"
              >
                <JobApplicationForm />
              </div>
            </div>

            <p className="text-center mt-10">
              Have an account?{" "}
              <a
                href="#"
                className="fw-500"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationArea;
