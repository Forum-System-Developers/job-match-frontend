import { useCities } from "@/hooks/use-cities";
import NiceSelect from "@/ui/nice-select";
import React from "react";

type CitySelectProps = {
  onChange: (selectedCity: { value: string; label: string }) => void;
  selectedCity: { value: string; label: string } | null;
  defaultCity: string;
};

const CitySelect = ({ onChange, defaultCity }: CitySelectProps) => {
  const handleCityChange = (item: { value: string; label: string }) => {
    onChange(item);
  };
  const { cities, isLoading, error } = useCities();
  const cities_data = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  if (isLoading) {
    return <p>Loading cities...</p>;
  }

  return (
    <NiceSelect
      options={cities_data}
      defaultCurrent={defaultCity}
      onChange={(item) => handleCityChange(item)}
      name="City"
      placeholder={defaultCity}
    />
  );
};

export default CitySelect;
