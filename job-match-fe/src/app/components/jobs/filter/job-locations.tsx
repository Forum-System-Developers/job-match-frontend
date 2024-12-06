import React from "react";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import { useAppDispatch } from "@/redux/hook";
import { setLocation } from "@/redux/features/filterSlice";
import { useAds } from "../../company/hooks/useAds";

const JobLocations = () => {
  const { ads, loading } = useAds();
  console.log(ads);
  const uniqueLocations = [...new Set(ads.map((job) => job.city_name))];
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
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default JobLocations;
