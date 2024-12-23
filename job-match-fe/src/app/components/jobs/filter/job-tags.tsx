import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setTags } from "@/redux/features/filterSlice";
import { JobAdResponse } from "@/data/job-ad-data";
import { JobApplication } from "@/data/job-applications-data";

type IProps = {
  items: JobAdResponse[] | JobApplication[];
};

const JobTags = ({ items }: IProps) => {
  const uniqueTags = [
    ...new Set(items.flatMap((job) => job.skills.map((skill) => skill.name))),
  ];
  const { tags } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();
  return (
    <div className="main-body">
      <ul className="style-none d-flex flex-wrap justify-space-between radio-filter mb-5">
        {uniqueTags.map((t, i) => (
          <li key={i}>
            <input
              onChange={() => dispatch(setTags(t))}
              type="checkbox"
              name="tags"
              defaultValue={t}
              checked={tags.includes(t)}
            />
            <label>{t}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTags;
