"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";

// form data type
type IFormData = {
  username: string;
  email: string;
  password: string;
  name: string;
  description: string;
  address_line: string;
  city: string;
  phone_number: string;
};

// schema
const schema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  name: Yup.string().required().label("Company Name"),
  description: Yup.string().required().label("Description"),
  address_line: Yup.string().required().label("Address Line"),
  city: Yup.string().required().label("City"),
  phone_number: Yup.string().required().label("Phone Number"),
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
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
          name: {
            type: "required",
            message: "Company name is required.",
          },
          description: {
            type: "required",
            message: "Description is required.",
          },
          address_line: {
            type: "required",
            message: "Address line is required.",
          },
          city: {
            type: "required",
            message: "City is required.",
          },
          phone_number: {
            type: "required",
            message: "Phone number is required.",
          },
        }
      : {},
  };
};

const CompanyRegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });

  const onSubmit = async (data: IFormData) => {
    if (data) {
      setIsSubmitting(true);
      try {
        const response = await axiosInstance.post(`/companies/`, data);
        reset();
        window.location.href = "/";
      } catch (error) {
        console.error("Company registration failed:", error);
        alert("Company registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Username*</label>
            <input
              type="text"
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
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
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
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Company name*</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              {...register("name", { required: `Company name is required!` })}
              name="name"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Description*</label>
            <input
              type="text"
              placeholder="Give your company a short description"
              {...register("description", {
                required: `Description is required!`,
              })}
              name="description"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.description?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Address line*</label>
            <input
              type="text"
              placeholder="Company address"
              {...register("address_line", {
                required: `Address is required!`,
              })}
              name="address_line"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.address_line?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>City*</label>
            <input
              type="text"
              placeholder="Enter City"
              {...register("city", { required: `City is required!` })}
              name="city"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.city?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Phone number*</label>
            <input
              type="text"
              placeholder="+1 2345 6789"
              {...register("phone_number", {
                required: `Phone number is required!`,
              })}
              name="phone_number"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.phone_number?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">
                By hitting the Register button, you agree to the{" "}
                <a href="#">Terms conditions</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompanyRegisterForm;
