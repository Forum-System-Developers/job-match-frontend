import React from "react";
import Image from "next/image";
import CompanyRegisterForm from "../forms/register-form-company";
import ProfessionalRegisterForm from "../forms/register-form-professional";

const RegisterArea = () => {
  return (
    <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
          <div className="text-center">
            <h2>Create Account</h2>
          </div>
          <div className="form-wrapper m-auto">
            <ul className="nav nav-tabs border-0 w-100 mt-30" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#fc1"
                  role="tab"
                  aria-selected="true"
                  tabIndex={-1}
                >
                  Professionals
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#fc2"
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  Companies
                </button>
              </li>
            </ul>
            <div className="tab-content mt-40">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                id="fc1"
              >
                <ProfessionalRegisterForm />
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc2">
                <CompanyRegisterForm />
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

export default RegisterArea;
