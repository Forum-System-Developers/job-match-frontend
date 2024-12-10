"use client";
import React from "react";
import NiceSelect from "@/ui/nice-select";

const EmployShortSelect = ({
  onStatusChange,
}: {
  onStatusChange: (status: string) => void;
}) => {
  const handleChange = (item: { value: string; label: string }) => {
    onStatusChange(item.value);
  };

  return (
    <NiceSelect
      options={[
        { value: "Active", label: "Active" },
        // { value: "Match Request Sent", label: "Match Request Sent" },
        { value: "Matched", label: "Matched" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleChange(item)}
      name="Short by"
    />
  );
};

export default EmployShortSelect;
