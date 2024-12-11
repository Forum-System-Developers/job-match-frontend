import React from "react";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import { useAppDispatch } from "@/redux/hook";
import { setLocation } from "@/redux/features/filterSlice";
import { JobAdResponse } from "@/data/job-ad-data";
import { JobApplication } from "@/data/job-applications-data";

type JobLocationsProps = {
  items: JobApplication[] | JobAdResponse[];
};

const JobLocations = ({ items }: JobLocationsProps) => {
  const uniqueLocations = [...new Set(items.map((item) => item.city))];
  const dispatch = useAppDispatch();

  const handleLocation = (item: { value: string; label: string }) => {
    dispatch(setLocation(item.value));
  };
  const options = uniqueLocations
    .map((l) => {
      // Check if l is a valid string and handle empty/null values
      if (typeof l === "string" && l.trim()) {
        return {
          value: slugify(l.split(",").join("-").toLowerCase(), "-"),
          label: l,
        };
      }
      // Return a default option if the city name is invalid
      return { value: "", label: "Unknown Location" };
    })
    .filter((option) => option.value); // Remove invalid options

  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default JobLocations;
