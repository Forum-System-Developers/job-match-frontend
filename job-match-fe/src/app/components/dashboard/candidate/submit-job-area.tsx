"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardHeader from "../candidate/dashboard-header";
import StateSelect from "../candidate/state-select";
import CitySelect from "../candidate/city-select";
import CountrySelect from "../candidate/country-select";
import EmployExperience from "../employ/employ-experience";
import icon from "@/assets/dashboard/images/icon/icon_16.svg";
import NiceSelect from "@/ui/nice-select";
import { useCategories } from "@/hooks/use-categories";
import {
  createJobApplication,
  JobApplicationStatus,
} from "@/data/job-applications-data";
import { getSkillsCategory } from "@/data/category-data";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [applicationStatus, setApplicationStatus] =
    useState<JobApplicationStatus>("active");
  const [categoryId, setCategoryId] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isMain, setIsMain] = useState<boolean>(false);
  const [minSalary, setMinSalary] = useState<number>(1);
  const [maxSalary, setMaxSalary] = useState<number>(1);
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  const { categories, isLoading: CategoriesLoading } = useCategories();
  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) || [];

  const handleAddSkill = (skill: string) => {
    const skillObject = { name: skill };
    if (!skills.some((s) => s.name === skill)) {
      setSkills([...skills, skillObject]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s.name !== skill));
    setAvailableSkills([...availableSkills, skill]);
  };

  const handleCreate = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const jobAppData = {
        name: name,
        category_id: categoryId,
        is_main: isMain,
        description: description,
        status: applicationStatus,
        city: city,
        min_salary: minSalary,
        max_salary: maxSalary,
        skills: skills,
      };

      await createJobApplication(jobAppData);
      window.location.reload();
    } catch (error) {
      throw new Error("Error updating profile:" + error);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        let fetchedSkills = await getSkillsCategory(categoryId);
        fetchedSkills = fetchedSkills.map((skill: any) => skill.name);
        setAvailableSkills(fetchedSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    if (categoryId) {
      fetchSkills();
    }
  }, [categoryId]);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job Application</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Application Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Application Title*</label>
            <input
              type="text"
              placeholder="Ex: Product Designer"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Application Description*</label>
            <textarea
              className="size-lg"
              placeholder="Describe your application in details..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Application Category</label>
                <NiceSelect
                  options={categoryOptions}
                  defaultCurrent={null}
                  placeholder="Select Category"
                  onChange={(item) => setCategoryId(item.value)}
                  name="Job Category"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">City*</label>
                <CitySelect
                  onChange={(city) => setCity(city.label)}
                  selectedCity={null}
                  defaultCity={"Select City"}
                />
              </div>
            </div>

            <h4 className="dash-title-three pt-50 lg-pt-30">Salary Range</h4>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Min Salary*</label>
                <input
                  type="text"
                  placeholder="Min"
                  onChange={(e) => setMinSalary(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Max Salary*</label>
                <input
                  type="text"
                  placeholder="Max"
                  onChange={(e) => setMaxSalary(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Skills & Experience
          </h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Skills*</label>
            <div
              className="skill-input-data d-flex align-items-center flex-wrap"
              contentEditable={false}
              style={{
                border: "1px solid #e5e5e5",
                minHeight: "60px",
                alignContent: "flex-start",
                alignItems: "center",
                textAlign: "left",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {skills.map((skill) => (
                <button
                  key={skill.name}
                  className="skill-button"
                  onClick={() => handleRemoveSkill(skill.name)}
                >
                  {skill.name} <span className="remove-icon">×</span>
                </button>
              ))}
            </div>
            <div></div>

            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {availableSkills.map((skill) => (
                <button key={skill} onClick={() => handleAddSkill(skill)}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Set Application Status
          </h4>
          <div className="row">
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Application Status*</label>
                <NiceSelect
                  options={[
                    {
                      value: "Active",
                      label: "Active (Visible for all)",
                    },
                    {
                      value: "Private",
                      label: "Private (Only you can see the application)",
                    },
                    {
                      value: "Hidden",
                      label: "Hidden (Only accessible by a direct link)",
                    },
                  ]}
                  defaultCurrent={null}
                  placeholder="Select Status"
                  onChange={(item) =>
                    setApplicationStatus(
                      item.value.toLowerCase() as JobApplicationStatus
                    )
                  }
                  name="Salary"
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Set Application as Main*</label>
                <NiceSelect
                  options={[
                    {
                      value: "true",
                      label: "Yes (To be used as default application)",
                    },
                    {
                      value: "false",
                      label: "No",
                    },
                  ]}
                  defaultCurrent={null}
                  placeholder="Set Application as Main"
                  onChange={(item) =>
                    setIsMain(item.value === "true" ? true : false)
                  }
                  name="Salary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <a
            href=""
            className="dash-btn-two tran3s me-3"
            onClick={handleCreate}
          >
            Create Application
          </a>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
