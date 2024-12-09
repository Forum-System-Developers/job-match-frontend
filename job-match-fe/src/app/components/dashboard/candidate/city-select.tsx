import { useCities } from "@/hooks/use-cities";
import NiceSelect from "@/ui/nice-select";
import React from "react";

const CitySelect = () => {
  const handleCity = (item: { value: string; label: string }) => {};
  const { cities, loading, error } = useCities();
  const cities_data = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  if (loading) {
    return <p>Loading cities...</p>;
  }

  return (
    <NiceSelect
      options={cities_data}
      defaultCurrent={0}
      onChange={(item) => handleCity(item)}
      name="City"
      placeholder="Select City"
    />
  );
};

export default CitySelect;
