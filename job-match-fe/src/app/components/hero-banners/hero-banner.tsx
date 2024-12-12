"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
// internal
import shape_1 from "@/assets/images/shape/shape_01.svg";
import shape_2 from "@/assets/images/shape/shape_02.svg";
import shape_3 from "@/assets/images/shape/shape_03.svg";
import main_img from "@/assets/images/assets/img_01.jpg";
import SearchForm from "../forms/search-form";
import {
  currentUser,
  getUserLocal,
  handleLogout,
  isAuthenticated,
  setGoogleUser,
} from "@/services/auth_service";
import { get } from "http";
import { Axios, AxiosError } from "axios";
import { removeLocalStorage } from "@/utils/localstorage";

const HeroBanner = () => {
  const user = getUserLocal();

  const verifyUser = async () => {
    try {
      const user = await currentUser();
      if (user && !isAuthenticated()) {
        setGoogleUser(user.id);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        if (isAuthenticated()) {
          removeLocalStorage("user");
          window.location.reload();
          return;
        } else {
          throw new Error("Error verifying user");
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      verifyUser();
    }
  }, [user]);

  return (
    <div className="hero-banner-one position-relative">
      <div className="container">
        <div className="position-relative pt-200 md-pt-150 pb-150 xl-pb-120 md-pb-80">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="wow fadeInUp" data-wow-delay="0.3s">
                We connect <span>businesses with professionals.</span>
              </h1>
              <p
                className="text-lg text-white mt-40 md-mt-30 mb-50 md-mb-30 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                The platform where talented freelancers meet companies seeking
                skilled professionals.
              </p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div
                  className="job-search-one position-relative me-xl-5 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  {/* search form start */}
                  <SearchForm />
                  {/* search form end */}
                  <ul className="tags d-flex flex-wrap style-none mt-20">
                    <li className="fw-500 text-white me-2">Popular:</li>
                    <li>
                      <a href="#">IT</a>
                    </li>
                    <li>
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <a href="#">Editing</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="img-box">
            <Image src={shape_1} alt="shape" className="lazy-img shapes" />
            <Image
              src={main_img}
              alt="main-img"
              className="lazy-img main-img w-100"
            />
          </div>
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default HeroBanner;
