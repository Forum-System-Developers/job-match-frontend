import React from "react";
import NiceSelect from "@/ui/nice-select";
import { useCompanies } from "../hooks/useCompanies";

const FilterCompanyLocation = () => {
  const { companies, loading } = useCompanies();
  const company_data = companies;

  const uniqueLocations = [...new Set(company_data.map((c) => c.location))];
  const handleLocation = (item: { value: string; label: string }) => {};
  const options = uniqueLocations.map((l) => {
    return { value: l, label: l };
  });
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default FilterCompanyLocation;
