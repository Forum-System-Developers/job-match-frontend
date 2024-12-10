"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import { IFormData, login, setUser } from "@/services/auth_service";
import axios from "axios";

// schema
const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters.")
    .matches(/^\w+$/, "Username must be alphanumeric.")
    .label("Username"),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .label("Password"),
});

// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
          username: {
            type: "required",
            message: "Username is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

const LoginForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = async (data: IFormData) => {
    if (data) {
      setIsSubmitting(true);
      try {
        const loggedIn = await login(data);
        if (!loggedIn) {
          throw new Error("Login failed.");
        }
        window.location.href = "/";
        reset();
      } catch (error) {
        console.error("Login failed:", error);
        alert(`Login failed: ${error}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Username*</label>
            <input
              type="username"
              placeholder="Enter Username"
              {...register("username", { required: `Username is required!` })}
              name="username"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.username?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a href="#">Forget Password?</a>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
