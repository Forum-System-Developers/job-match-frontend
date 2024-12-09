import React from "react";
import NiceSelect from "@/ui/nice-select";
import { CompanyDetails } from "@/data/company-data";

const FilterCompanyLocation = ({
  companies,
}: {
  companies: Array<CompanyDetails>;
}) => {
  const uniqueLocations = [...new Set(companies.map((c) => c.city))];
  const handleLocation = (item: { value: string; label: string }) => {};
  const options = uniqueLocations.map((l) => {
    return { value: l, label: l };
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

export default FilterCompanyLocation;
