"use client";
import React, { useEffect } from "react";
import { resetFilter } from "@/redux/features/filterSlice";
import { useAppDispatch } from "@/redux/hook";
import { animationCreate } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { isAuthenticated, role } from "@/utils/auth_utils";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const PUBLIC_PATHS = [
  "/",
  "/about-us",
  "/register",
  "/contact",
  "/pricing",
  "/faq",
];

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  //  handle reset first time render this page
  const handleReset = () => {
    dispatch(resetFilter());
  };
  useEffect(() => {
    animationCreate();
  }, []);
  const isPublicRoute = PUBLIC_PATHS.includes(pathname);
  const authenticated = isAuthenticated();

  const validateRole = () => {
    if (
      role === "professional" &&
      pathname.includes("/dashboard/employ-dashboard")
    ) {
      redirect("/");
    } else if (
      role === "company" &&
      pathname.includes("/dashboard/candidate-dashboard")
    ) {
      redirect("/");
    }
  };

  const validateAuthentication = () => {
    if (!authenticated && !isPublicRoute) {
      redirect("/register");
    } else {
      validateRole();
    }
  };

  useEffect(() => {
    validateAuthentication();
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Wrapper;
