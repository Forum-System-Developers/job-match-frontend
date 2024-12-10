import NiceSelect from "@/ui/nice-select";
import React from "react";

type StatusSelectProps = {
  onChange: (selectedStatus: { value: string; label: string }) => void;
  default: string;
};

const StatusSelect = ({
  onChange,
  default: defaultValue,
}: StatusSelectProps) => {
  const handleStatusChange = (item: { value: string; label: string }) => {
    onChange(item);
  };

  return (
    <NiceSelect
      options={[
        { value: "1", label: "Active" },
        { value: "2", label: "Busy" },
      ]}
      defaultCurrent={defaultValue}
      onChange={(item) => handleStatusChange(item)}
      name="City"
      placeholder={defaultValue}
    />
  );
};

export default StatusSelect;
