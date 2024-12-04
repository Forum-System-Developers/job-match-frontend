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
  title: string;
  description: string;
  location_id: string;
  category_id: string;
  min_salary: number;
  max_salary: number;
};

const JobAdForm = () => {
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

    if (!formData.title) {
      newErrors.title = "Job Ad title is required.";
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
      const response = await axiosInstance.post(`/job-ads/`, data, {
        headers: { "Content-Type": "application/json" },
      });
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
            <label>Title*</label>
            <input
              type="text"
              placeholder="Enter title"
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
            <label>Job Ad details*</label>
            <input
              type="text"
              placeholder="Provide a description for this job ad"
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

export default JobAdForm;
