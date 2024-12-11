import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setTags } from "@/redux/features/filterSlice";
import { JobAdResponse } from "@/data/job-ad-data";

type IProps = {
  ads: JobAdResponse[];
};

const JobTags = ({ ads }: IProps) => {
  const uniqueTags = [...new Set(ads.flatMap((job) => job.requirements))];
  const { tags } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div className="main-body">
      <ul className="style-none d-flex flex-wrap justify-space-between radio-filter mb-5">
        {uniqueTags.map((t, i) => (
          <li key={i}>
            <input
              onChange={() => dispatch(setTags(t as string))}
              type="checkbox"
              name="tags"
              defaultValue={t}
              checked={tags.includes(t as string)}
            />
            <label>{t}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTags;
