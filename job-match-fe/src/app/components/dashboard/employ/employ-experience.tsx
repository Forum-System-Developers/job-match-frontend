import NiceSelect from "@/ui/nice-select";
import React from "react";

type ExperienceSelectProps = {
  onChange: (selectedLevel: { value: string; label: string }) => void;
  selectedLevel: { value: string; label: string } | null;
  defaultLevel: string;
};

const EmployExperience = ({
  onChange,
  selectedLevel,
  defaultLevel,
}: ExperienceSelectProps) => {
  const handleExperience = (item: { value: string; label: string }) => {
    onChange(item);
  };

  return (
    <div className="row align-items-end">
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Experience*</label>
          <NiceSelect
            options={[
              { value: "intern", label: "Intern" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
              { value: "expert", label: "Expert" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleExperience(item)}
            name="Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployExperience;
