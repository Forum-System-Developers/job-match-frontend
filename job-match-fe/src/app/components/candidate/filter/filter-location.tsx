import NiceSelect from "@/ui/nice-select";
import React from "react";
import slugify from "slugify";
import { useAppDispatch } from "@/redux/hook";
import { IPropsProfessionals } from "./candidate-v1-filter-area";
import { setLocation } from "@/redux/features/filterSlice";

const FilterCandidateLocation = ({ items }: IPropsProfessionals) => {
  const dispatch = useAppDispatch();

  const candidate_data = items;
  console.log(candidate_data.map((c) => c.city));

  const uniqueLocations = [...new Set(candidate_data.map((c) => c.city))];
  const handleLocation = (item: { value: string; label: string }) => {
    dispatch(setLocation(item.value));
  };
  const options = uniqueLocations.map((l) => {
    return {
      value: slugify(l.split(",").join("-").toLowerCase(), "-"),
      label: l,
    };
  });
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      placeholder="Location"
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default FilterCandidateLocation;
