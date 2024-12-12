"use client";
import React from "react";
import NiceSelect from "@/ui/nice-select";

const ShortSelect = ({
  onStatusChange,
}: {
  onStatusChange: (status: string) => void;
}) => {
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {
    onStatusChange;
  };
  return (
    <NiceSelect
      options={[
        { value: "active", label: "Active" },
        { value: "hidden", label: "Hidden" },
        { value: "private", label: "Private" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleShort(item)}
      name="Short by"
    />
  );
};

export default ShortSelect;
