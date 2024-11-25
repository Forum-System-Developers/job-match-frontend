"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import logo from "@/assets/images/logo/rephera-logo.png";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import useSticky from "@/hooks/use-sticky";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import { role, isAuthenticated, setRole } from "@/utils/auth_utils";

const Header = () => {
  const { sticky } = useSticky();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`http://${SERVER_URL}/auth/logout`);
      localStorage.removeItem("role");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image
                    src={logo}
                    alt="logo"
                    priority
                    style={{
                      width: "200px",
                      height: "auto",
                      display: "block",
                      margin: 0,
                    }}
                  />
                </Link>
              </div>
              <div className="right-widget ms-auto order-lg-3">
                {!isAuthenticated() ? (
                  <ul className="d-flex align-items-center style-none">
                    <li className="d-none d-md-block">
                      <Link href="/register" className="job-post-btn tran3s">
                        Post Job
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="login-btn-one"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        Login
                      </a>
                    </li>
                    <li className="d-none d-md-block ms-4">
                      <Link href="/candidates-v1" className="btn-one">
                        Hire Top Talents
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="d-flex align-items-center style-none">
                    <li className="d-none d-md-block">
                      {role === "company" ? (
                        <Link
                          href="/dashboard/employ-dashboard/submit-job"
                          className="job-post-btn tran3s"
                        >
                          Create Job Ad
                        </Link>
                      ) : (
                        <Link
                          href="/create-application"
                          className="job-post-btn tran3s"
                        >
                          Create Application
                        </Link>
                      )}
                    </li>
                    <li className="d-none d-md-block">
                      <Link
                        href="/"
                        className="login-btn-one"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <nav className="navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav align-items-lg-center">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          <Image src={logo} alt="logo" width={100} priority />
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown category-btn mega-dropdown-sm">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        <i className="bi bi-grid-fill"></i> Category
                      </a>
                      {/* CategoryDropdown start */}
                      <CategoryDropdown />
                      {/* CategoryDropdown end */}
                    </li>
                    {/* menus start */}
                    <Menus />
                    {/* menus end */}
                    <li className="d-md-none">
                      <Link href="/register" className="job-post-btn tran3s">
                        Post Job
                      </Link>
                    </li>
                    <li className="d-md-none">
                      <Link href="/candidates-v1" className="btn-one w-100">
                        Hire Top Talents
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* login modal start */}
      <LoginModal />
      {/* login modal end */}
    </>
  );
};

export default Header;
