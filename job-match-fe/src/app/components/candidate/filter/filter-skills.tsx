import React from "react";
import { IPropsProfessionals } from "./candidate-v1-filter-area";
import { setTags } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const FilterSkills = ({ items }: IPropsProfessionals) => {
  const candidate_data = items;

  const uniqueSkills = [
    ...new Set(
      candidate_data.flatMap((c) =>
        c.skills.map((skill: { name: string }) => skill.name)
      )
    ),
  ];
  const { tags } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div className="main-body">
      <ul className="style-none d-flex flex-wrap justify-space-between radio-filter mb-5">
        {uniqueSkills.map((t, i) => (
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

  // return (
  //   <NiceSelect
  //     options={options}
  //     defaultCurrent={0}
  //     placeholder="Select Skills"
  //     onChange={(item) => handleSkills(item)}
  //     cls="bg-white"
  //     name="Category"
  //   />
  // );
};

export default FilterSkills;
