"use client";
import React, { useState } from "react";
import Image from "next/image";
// import { Checkbox } from "@nextui-org/react";
import icon from "@/assets/images/icon/icon_60.svg";
import axiosInstance from "@/services/axiosInstance";
import SERVER_URL from "@/services/server";
import { data } from "autoprefixer";

// form data type
type IFormData = {
  min_salary: number;
  max_salary: number;
  description: string;
  city: string;
  is_main: boolean;
  skills: Array<string>;
  status: "active" | "private" | "hidden";
};

const JobApplicationForm = () => {
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

    if (!formData.description) {
      newErrors.description = "Description is required.";
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      is_main: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        `${SERVER_URL}/job-applications/`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormData({});
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
            <label>Job Application details*</label>
            <input
              type="text"
              placeholder="Provide a description for your job application"
              value={formData.description || ""}
              onChange={handleInputChange}
              name="description"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.username?} />
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
              placeholder="Specify a City for your job application"
            />
            {/* <div className="help-block with-errors">
              <ErrorMsg msg={errors.first_name?.message!} />
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
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <input
              type="checkbox"
              checked={formData.is_main === true}
              onChange={handleCheckboxChange}
            />
            <label>Set your application as Main</label>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobApplicationForm;
