import React from "react";
import NiceSelect from "@/ui/nice-select";
import { CompanyDetails } from "@/data/company-data";
import { useAppDispatch } from "@/redux/hook";
import { setLocation } from "@/redux/features/filterSlice";
import slugify from "slugify";

const FilterCompanyLocation = ({
  companies,
}: {
  companies: CompanyDetails[];
}) => {
  const uniqueLocations = [...new Set(companies.map((c) => c.city))];
  const dispatch = useAppDispatch();

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

export default FilterCompanyLocation;
