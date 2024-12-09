import React from "react";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import { useAds } from "../company/hooks/useAds";

const JobLocationSelect = ({
  setLocationVal,
}: {
  setLocationVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { ads, loading: companyLoading } = useAds();

  const uniqueLocations = [...new Set(ads.map((job) => job.city_name))];
  // location_option
  const location_option = uniqueLocations.map((l) => {
    return {
      value: slugify(l.split(",").join("-").toLowerCase(), "-"),
      label: l,
    };
  });
  const handleLocation = (item: { value: string; label: string }) => {
    setLocationVal(item.value);
  };
  return (
    <NiceSelect
      options={location_option}
      placeholder="Location"
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="looking for"
      cls="location"
    />
  );
};

export default JobLocationSelect;
