import NiceSelect from "@/ui/nice-select";
import React from "react";

type StatusSelectProps = {
  onChange: (selectedStatus: { value: string; label: string }) => void;
};

const StatusSelect = ({ onChange }: StatusSelectProps) => {
  const handleCity = (item: any) => {
    console.log(item);
  };

  return (
    <NiceSelect
      options={[
        { value: "1", label: "Active" },
        { value: "2", label: "Inactive" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleCity(item)}
      name="City"
      placeholder="Select City"
    />
  );
};

export default StatusSelect;
