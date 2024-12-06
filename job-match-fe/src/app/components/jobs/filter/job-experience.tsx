import React from "react";
import { setExperience } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAds } from "../../company/hooks/useAds";

export function JobExperienceItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  const { ads, loading } = useAds();

  const uniqueExperiences = [...new Set(ads.map((job) => job.skill_level))];
  const { experience } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {uniqueExperiences.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setExperience(e))}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={experience.includes(e)}
          />
          <label>
            {e}
            {showLength && (
              <span>{ads.filter((job) => job.skill_level === e).length}</span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobExperience = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems />
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
