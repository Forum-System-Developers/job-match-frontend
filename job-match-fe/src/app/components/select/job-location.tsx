import React from "react";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import { useAds } from "../company/hooks/useAds";
import { useCities } from "@/hooks/use-cities";

const JobLocationSelect = ({
  setLocationVal,
}: {
  setLocationVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { cities, isLoading, error } = useCities();
  const cities_data = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  if (isLoading) {
    return <p>Select Location</p>;
  }
  const handleLocation = (item: { value: string; label: string }) => {
    setLocationVal(item.value);
  };
  return (
    <NiceSelect
      options={cities_data}
      placeholder="Select Location"
      defaultCurrent={null}
      onChange={(item) => handleLocation(item)}
      name="looking for"
      cls="location"
    />
  );
};

export default JobLocationSelect;
