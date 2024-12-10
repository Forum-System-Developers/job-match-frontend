"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardHeader from "../candidate/dashboard-header";
import StateSelect from "../candidate/state-select";
import CitySelect from "../candidate/city-select";
import CountrySelect from "../candidate/country-select";
import EmployExperience from "./employ-experience";
import icon from "@/assets/dashboard/images/icon/icon_16.svg";
import NiceSelect from "@/ui/nice-select";
import DashboardHeaderEmployer from "./dashboard-header";
import { createJobAd, SkillLevel } from "@/data/job-ad-data";
import { useCities } from "@/hooks/use-cities";
import { useCategories } from "@/hooks/use-categories";
import { getSkillsCategory } from "@/data/category-data";
import { set } from "react-hook-form";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("intern");
  const [categoryId, setCategoryId] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [minSalary, setMinSalary] = useState<number>(1);
  const [maxSalary, setMaxSalary] = useState<number>(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  const { cities, isLoading: CitiesLoading } = useCities();
  const { categories, isLoading: CategoriesLoading } = useCategories();
  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) || [];

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      setAvailableSkills(availableSkills.filter((s) => s !== skill));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
    setAvailableSkills([...availableSkills, skill]);
  };

  const handleCreate = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const jobAdData = {
        title: title,
        description: description,
        skill_level: skillLevel,
        category_id: categoryId,
        location_id: cityId,
        min_salary: minSalary,
        max_salary: maxSalary,
        skills: skills,
      };

      await createJobAd(jobAdData);
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
        <DashboardHeaderEmployer setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            <input
              type="text"
              placeholder="Ex: Product Designer"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Category*</label>
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
                  onChange={(city) => setCityId(city.value)}
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
                  key={skill}
                  className="skill-button"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  {skill} <span className="remove-icon">×</span>
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

          <EmployExperience
            onChange={(item) => setSkillLevel(item.value as SkillLevel)}
            selectedLevel={null}
            defaultLevel={"Select Experience"}
          />

          <div className="button-group d-inline-flex align-items-center mt-30">
            <a
              href=""
              className="dash-btn-two tran3s me-3"
              onClick={handleCreate}
            >
              Create Ad
            </a>
            <a href="#" className="dash-cancel-btn tran3s">
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
