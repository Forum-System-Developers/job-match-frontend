"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@nextui-org/react";
import icon from "@/assets/images/icon/icon_60.svg";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";

// form data type
type IFormData = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  description: string;
  city: string;
  status: "active" | "busy";
};

const ProfessionalRegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"active" | "busy">("active");
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormData, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked ? "active" : "busy");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IFormData, string>> = {};

    if (!formData.username || formData.username.trim() === "") {
      newErrors.username = "Username is required.";
    }
    if (
      !formData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "A valid email is required.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.first_name || formData.first_name.trim() === "") {
      newErrors.first_name = "First Name is required.";
    }
    if (!formData.last_name || formData.last_name.trim() === "") {
      newErrors.last_name = "Last Name is required.";
    }
    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Description is required.";
    }
    if (!formData.city || formData.city.trim() === "") {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const payload = {
        professional: { ...formData },
        status,
      };
      const response = await axiosInstance.post(
        `http://${SERVER_URL}/professionals/`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormData({});
      window.location.href = "/";
    } catch (error) {
      console.error("Professional registration failed:", error);
      alert("Professional registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Username*</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={formData.username || ""}
              onChange={handleInputChange}
              name="username"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.username?} />
            </div> */}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              value={formData.email || ""}
              onChange={handleInputChange}
              name="email"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div> */}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div> */}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>First Name*</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleInputChange}
              placeholder="Enter First Name"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.first_name?.message!} />
            </div> */}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Last Name*</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.last_name?.message!} />
            </div> */}
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Description*</label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Provide a brief description of yourself"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.description} />
            </div> */}
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>City*</label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              placeholder="Enter City name"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.city} />
            </div> */}
          </div>
        </div>

        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <input
              type="checkbox"
              checked={formData.status === "active"}
              onChange={handleCheckboxChange}
            />
            <label>Active Status</label>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfessionalRegisterForm;
