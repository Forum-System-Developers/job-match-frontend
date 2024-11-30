import React from "react";
import NiceSelect from "@/ui/nice-select";
import { useProfessionals } from "../hooks/useProfessionals";

const FilterSkills = () => {
  const { professionals, loading } = useProfessionals();
  const candidate_data = professionals;

  const uniqueSkills = [...new Set(candidate_data.flatMap((c) => c.skills))];
  const options = uniqueSkills.map((c) => {
    return { value: c, label: c };
  });
  const handleSkills = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleSkills(item)}
      cls="bg-white"
      name="Category"
    />
  );
};

export default FilterSkills;
